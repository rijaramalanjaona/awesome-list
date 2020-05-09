import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {WorkdaysService} from '../../../core/services/workdays.service';
import {AuthService} from '../../../core/services/auth.service';
import {Workday} from '../../../shared/models/workday';

@Component({
	selector: 'al-workday-form',
	templateUrl: './workday-form.component.html',
	styles: []
})
export class WorkdayFormComponent implements OnInit {
	workdayForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private workdaysService: WorkdaysService,
		private authService: AuthService) { }

	ngOnInit() {
		this.workdayForm = this.createWorkDayForm();
	}

	get dueDate() { return this.workdayForm.get('dueDate'); }
	get notes() { return this.workdayForm.get('notes'); }
	get tasks() { return this.workdayForm.get('tasks') as FormArray; }

	createWorkDayForm(): FormGroup {
		return this.fb.group({
			dueDate: ['', [
				Validators.required
			]],
			/**
			 * FormArray permet de regrouper des champs de formulaire sans déterminer à l’avance combien de champs vous attendez en entrée.
			 * Au contraire, avec un FormGroup, vous devez déclarer chaque champ attendu.
			 */
			tasks: this.fb.array([], [
				Validators.required,
				Validators.maxLength(6)
			]),
			notes: ['', [
				Validators.maxLength(1000)
			]]
		});
	}

	submit(): void {
		const userId: string = this.authService.currentUser.id;

		const workday: Workday = new Workday({
			...{ userId }, // le spread operator ... de ES6 permet de fusionner les propriétés de 2 objets différents
			...this.workdayForm.value
		});

		this.workdaysService.save(workday).subscribe(
			_ => this.router.navigate(['/app/planning']),
			_ => this.workdayForm.reset()
		);
	}

	resetWorkdayForm() {
		while (this.tasks.length !== 0) {
			this.tasks.removeAt(0);
		}
		this.notes.reset();
	}

	onDateSelected(displayDate: string) {
		// Vérifier s'il y a une journée de travail correspondant à displayDate dans Firestore
		this.workdaysService.getWorkdayByDate(displayDate).subscribe(workday => {
			// vider le formulaire dans tous les cas
			this.resetWorkdayForm();

			if (!workday) {
				return;
			}

			// remplir le formulaire avec les données du workday venant de Firestore
			this.notes.setValue(workday.notes);

			workday.tasks.forEach(task => {
				const taskField: FormGroup = this.fb.group({
					title: task.title,
					todo: task.todo,
					done: task.done
				});
				this.tasks.push(taskField);
			});
		});
	}
}
