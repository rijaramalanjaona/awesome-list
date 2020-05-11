import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Workday} from '../../../shared/models/workday';
import {AuthService} from '../../../core/services/auth.service';
import {WorkdaysService} from '../../../core/services/workdays.service';

@Component({
	selector: 'al-planning-workday-list',
	templateUrl: './planning-workday-list.component.html',
	styles: []
})
export class PlanningWorkdayListComponent implements OnInit {

	workdays$: Observable<Workday>;

	constructor(private authService: AuthService, private workdayService: WorkdaysService) { }

	ngOnInit() {
		const id: string = this.authService.currentUser.id;
		this.workdays$ = this.workdayService.getWorkdayByUser(id);
	}

	onWorkdayRemoved(dueDate: string) {
		// tslint:disable-next-line:no-console
		console.info(dueDate);
	}
}
