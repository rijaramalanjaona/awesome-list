import {Component, Input } from '@angular/core';

@Component({
	selector: 'al-planning-workday-item',
	templateUrl: './planning-workday-item.component.html',
	styles: []
})
export class PlanningWorkdayItemComponent {
	@Input('workday') // pour le composant parent, la propriete recevant les donnees du composant est toujours workday.
	currentWorkday; // utilisation d'un alias, a utiliser juste dans le composant lui-meme
}
