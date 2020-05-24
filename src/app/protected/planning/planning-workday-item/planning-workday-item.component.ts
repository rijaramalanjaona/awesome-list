import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Workday} from '../../../shared/models/workday';
import {Router} from '@angular/router';

@Component({
	selector: 'al-planning-workday-item',
	templateUrl: './planning-workday-item.component.html',
	styles: []
})
export class PlanningWorkdayItemComponent implements OnInit {
	@Input()
	workday: Workday;

	@Output()
	workdayRemoved = new EventEmitter<Workday>(); // on émet directement un workday

	constructor(private router: Router) {}

	ngOnInit() {}

	removeWorkday() {
		this.workdayRemoved.emit(this.workday);
	}

	/**
	 * permet de faire une redirection vers la page d'édition de planning workday-form
	 * url de la forme localhost:4200/app/workday?date=1587477909000
	 */
	goWorkday(workday: Workday) {
		this.router.navigate(
			['app/workday'],
			{
				queryParams: {
					date: workday.dueDate
				}
			}
		);
	}
}
