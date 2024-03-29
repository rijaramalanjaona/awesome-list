import {Component, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'al-workday-form-tasks',
	templateUrl: './workday-form-tasks.component.html',
	styles: []
})
export class WorkdayFormTasksComponent {
	@Input()
	tasks: FormArray;

	@Input()
	workdayForm: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	createTaskForm(): FormGroup {
		return this.fb.group({
			title: ['', [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(150)
			]],
			todo: [1, [
				Validators.required,
				Validators.min(1),
				Validators.max(5)
			]],
			done: 0
		});
	}

	/**
	 *  instancie un nouveau FormGroup
	 *  ensuite, on pousse cette nouvelle tâche dans la liste des tâches du formulaire
	 */
	onAddedTask() {
		const taskGroup = this.createTaskForm();
		this.tasks.push(taskGroup);
	}

	onRemovedTask(index: number) {
		this.tasks.removeAt(index);
	}
}
