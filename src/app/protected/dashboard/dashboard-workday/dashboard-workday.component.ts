import {Component, Input} from '@angular/core';
import {Workday} from '../../../shared/models/workday';

@Component({
	selector: 'al-dashboard-workday',
	templateUrl: './dashboard-workday.component.html',
	styleUrls: ['./dashboard-workday.component.scss']
})
export class DashboardWorkdayComponent {
	@Input()
	workday: Workday;
}
