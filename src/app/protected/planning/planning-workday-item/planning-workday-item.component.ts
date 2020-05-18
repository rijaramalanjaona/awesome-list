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
	workdayRemoved = new EventEmitter<string>();

	constructor(private router: Router) {}

	ngOnInit() {}

	removeWorkday(displayDate: string) {
		this.workdayRemoved.emit(displayDate);
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
