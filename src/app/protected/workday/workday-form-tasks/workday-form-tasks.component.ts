import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';

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

	constructor() { }

	ngOnInit() {
	}

}
