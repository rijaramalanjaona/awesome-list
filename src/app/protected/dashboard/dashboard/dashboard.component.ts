import { Component, OnInit } from '@angular/core';
import {DateService} from '../../../core/services/date.service';
import {User} from '../../../shared/models/user';
import {Observable} from 'rxjs';
import {Workday} from '../../../shared/models/workday';
import {AuthService} from '../../../core/services/auth.service';
import {WorkdaysService} from '../../../core/services/workdays.service';

@Component({
	selector: 'al-dashboard',
	templateUrl: './dashboard.component.html',
	styles: []
})
export class DashboardComponent implements OnInit {
	currentDate: string;
	currentUser: User;
	workday$: Observable<Workday>;

	constructor(private authService: AuthService, private dateService: DateService, private workdaysService: WorkdaysService) { }

	ngOnInit() {
		this.currentDate = this.dateService.getDisplayDate(new Date());
		this.currentUser = this.authService.currentUser;
		this.workday$ = this.workdaysService.getWorkdayByDate(this.currentDate, this.currentUser.id);
	}

}
