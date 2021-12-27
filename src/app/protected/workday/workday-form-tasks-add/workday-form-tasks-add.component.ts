import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
	selector: 'al-workday-form-tasks-add',
	templateUrl: './workday-form-tasks-add.component.html',
	styles: []
})
export class WorkdayFormTasksAddComponent {
	@Output()
	addedTask = new EventEmitter<void>();

	constructor() { }

	addTask() {
		this.addedTask.emit();
	}

}
