import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
	selector: 'al-workday-form-tasks-item',
	templateUrl: './workday-form-tasks-item.component.html',
	styleUrls: ['./workday-form-tasks-item.component.scss']
})
export class WorkdayFormTasksItemComponent {
	@Input() task: FormGroup;
	@Input() index: number;
	@Input() isFirst: boolean;
	@Input() isLast: boolean;

	@Output() removedTask = new EventEmitter<number>();

	constructor() { }

	removeTask(index: number) {
		this.removedTask.emit(index);
	}

	// maj du nombre de pomodoros d'une tâche
	selectTodo(todo: number) {
		// patchValue de Angular pour maj seulement certaines propriétés d'un objet vs setValue qui remplace toutes les propriétés
		this.task.patchValue({ todo });
	}

}
