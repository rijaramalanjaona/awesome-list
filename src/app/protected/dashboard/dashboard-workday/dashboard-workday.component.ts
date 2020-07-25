import {Component, Input, OnInit} from '@angular/core';
import {Workday} from '../../../shared/models/workday';
import {interval, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
	selector: 'al-dashboard-workday',
	templateUrl: './dashboard-workday.component.html',
	styleUrls: ['./dashboard-workday.component.scss']
})
export class DashboardWorkdayComponent implements OnInit {
	@Input()
	workday: Workday;

	isPomodoroActive: boolean;

	// flux représentant des événements => Subject, ces flux peuvent être pilotés directement depuis le code
	startPomodoro$: Subject<string>;
	cancelPomodoro$: Subject<string>;
	completePomodoro$: Subject<string>;

	currentProgress: number;
	maxProgress: number; // durée d'un pomodoro

	// flux correspondant au temps qui s'écoule => Observable, émettre le nb de secondes écoulées depuis le démarrage du pomodoro
	pomodoro$: Observable<number>;

	constructor() {}

	ngOnInit(): void {
		this.isPomodoroActive = false;

		this.startPomodoro$ = new Subject<string>();
		this.cancelPomodoro$ = new Subject<string>();
		this.completePomodoro$ = new Subject<string>();

		this.currentProgress = 0;
		this.maxProgress = 5;

		this.pomodoro$ = interval(1000).pipe(
			map(x => x + 1)
		);
	}

	startPomodoro() {
		this.isPomodoroActive = true;
	}

	cancelPomodoro() {
		this.isPomodoroActive = false;
	}

	completePomodoro() {
		this.isPomodoroActive = false;
	}
}
