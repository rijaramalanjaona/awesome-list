import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange} from '@angular/core';

@Component({
	selector: 'al-planning-workday-item',
	templateUrl: './planning-workday-item.component.html',
	styles: []
})
export class PlanningWorkdayItemComponent implements OnChanges {
	@Input() dueDate: string;
	@Input() doneTasks: number | string;
	@Input() remainingTasks: number | string;

	@Output()
	workdayRemoved = new EventEmitter<string>();

	/**
	 * Cette méthode prend en paramètre toutes les modifications apportées sur les propriétés d’entrée du composant.
	 * Ces modifications sont passées dans le paramètre changes.
	 * Ce paramètre est un tableau d’objet de type SimpleChange, qui est un objet propre à Angular,
	 * et qui permet de modéliser les modifications apportées aux propriétés d’entrées du composant.
	 *
	 */
	ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
		// tslint:disable-next-line:forin
		for (const propName in changes) {
			this.update(propName, changes[propName].currentValue);
		}
	}

	update(propName, propValue) {
		switch (propName) {
			case 'dueDate': {
				if ('Lundi' === propValue) {
					this.dueDate += ' (Aujourd\'hui)';
				}
				break;
			}
			case 'doneTasks': {
				if (0 === propValue) {
					this.doneTasks = 'Aucune tâche terminée.';
				}
				break;
			}
			case 'remainingTasks': {
				if (0 === propValue) {
					this.remainingTasks = 'Journée de travail terminée !';
				}
				break;
			}
			default: {
				break;
			}
		}
	}

	removeWorkday(dueDate: string) {
		this.workdayRemoved.emit(dueDate);
	}
}
