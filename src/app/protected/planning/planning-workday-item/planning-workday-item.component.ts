import {Component, Input } from '@angular/core';

@Component({
	selector: 'al-planning-workday-item',
	templateUrl: './planning-workday-item.component.html',
	styles: []
})
export class PlanningWorkdayItemComponent {
	private currentWorkday; // nom interne utilisé dans le composant

	/**
	 * le nom de la propriété d’entrée appelé par le composant parent sera le nom du setter, qui est workday.
	 * Cette méthode prend en paramètre un workday.
	 * Toutes les valeurs qui arriveront en entrée de ce composant seront envoyées en paramètre du setter,
	 * et vous pouvez ensuite effectuer un traitement spécifique pour chacune de ses données.
	 *
	 */
	@Input()
	set workday(workday) {
		this.currentWorkday = workday || {}; // if workday == null => currentWorkday = {}

		// traitement spécifique d'affichage
		if ('Lundi' === workday.dueDate) {
			this.currentWorkday.dueDate += ' (Aujourd\'hui)';
		}
	}

	/**
	 * Pour masquer le nom de la propriété intermédiaire currentWorkday dans le template
	 * Permet d'utiliser le même nom de propriété entre le composant parent et fils
	 */
	get workday() {
		return this.currentWorkday;
	}
}
