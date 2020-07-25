import {Component, Input, OnInit} from '@angular/core';
import {Workday} from '../../../shared/models/workday';
import {interval, Observable, of, Subject} from 'rxjs';
import {delay, map, takeUntil, takeWhile} from 'rxjs/operators';
import { Task } from 'src/app/shared/models/task';
import {WorkdaysService} from '../../../core/services/workdays.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
	selector: 'al-dashboard-workday',
	templateUrl: './dashboard-workday.component.html',
	styleUrls: []
})
export class DashboardWorkdayComponent implements OnInit {
	@Input()
	workday: Workday;

	isWorkdayComplete: boolean;

	isPomodoroActive: boolean;

	// flux représentant des événements => Subject, ces flux peuvent être pilotés directement depuis le code
	startPomodoro$: Subject<string>;
	cancelPomodoro$: Subject<string>;
	completePomodoro$: Subject<string>;

	currentProgress: number;
	maxProgress: number; // durée d'un pomodoro

	// flux correspondant au temps qui s'écoule => Observable, émettre le nb de secondes écoulées depuis le démarrage du pomodoro
	pomodoro$: Observable<number>;

	constructor(private workdaysService: WorkdaysService, private authService: AuthService) {}

	ngOnInit(): void {
		this.isPomodoroActive = false;

		this.isWorkdayComplete = (this.currentTask === undefined);

		this.startPomodoro$ = new Subject<string>();
		this.cancelPomodoro$ = new Subject<string>();
		this.completePomodoro$ = new Subject<string>();

		this.currentProgress = 0;
		// this.maxProgress = 5; pour faire des tests rapides pomodoro d'une durée de 5s
		this.maxProgress = this.authService.currentUser.pomodoroDuration;

		this.pomodoro$ = interval(1000).pipe(
			// désabonnement au flux grace à l'opérateur takeUntil
			takeUntil(this.cancelPomodoro$),
			takeUntil(this.completePomodoro$),

			// désabonnement au flux grace à l'opérateur takeWhile qui prend en param une simple condition
			takeWhile(progress => progress <= this.maxProgress),

			map(x => x + 1)
		);
	}

	// Récupérer la tâche courante
	get currentTask(): Task|undefined {
		return this.workday.tasks.find((task: Task) => task.todo > task.done);
	}

	startPomodoro() {
		this.isPomodoroActive = true;

		// émettre des valeurs dans les Subject avec .next (on peut mettre n'importe quelle valeur)
		this.startPomodoro$.next('start');

		// abonnement au flux pomodoro$
		this.pomodoro$.subscribe(currentProgress => {
			this.currentProgress = currentProgress; // this.currentProgress s'actualise toutes les secondes

			// détecter la fin d'un pomodoro
			if (currentProgress === this.maxProgress) {
				of(0).pipe(
					delay(500) // on attend 500 ms
				).subscribe(
					_ => this.completePomodoro()
				);
			}
		});
	}

	cancelPomodoro() {
		this.isPomodoroActive = false;

		// désabonnement au flux pomodoro$
		this.cancelPomodoro$.next('cancel');
	}

	completePomodoro() {
		this.isPomodoroActive = false;

		// désabonnement au flux pomodoro$
		this.completePomodoro$.next('complete');

		// Incrémenter le nombre de pomodoros terminés pour la tâche courante
		this.currentTask.done++;

		// Vérifier si la journée de travail est terminée
		this.isWorkdayComplete = (this.currentTask === undefined);

		// MAJ backend
		this.workdaysService.update(this.workday).subscribe();
	}
}
