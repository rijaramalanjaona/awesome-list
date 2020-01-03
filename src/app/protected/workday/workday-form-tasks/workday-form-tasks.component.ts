import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
	selector: 'al-workday-form-tasks',
	templateUrl: './workday-form-tasks.component.html',
	styles: []
})
export class WorkdayFormTasksComponent implements OnInit {
	@Input()
	tasks: FormArray;

	@Input()
	workdayForm: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
	}

	/**
	 *  instancie un nouveau FormGroup contenant simplement un titre de tâche vide
	 *  ensuite, on pousse cette nouvelle tâche vierge dans la liste des tâches du formulaire
	 */
	onAddedTask() {
		const taskGroup = this.fb.group({
			'title': ''
		});
		this.tasks.push(taskGroup);
	}

}
