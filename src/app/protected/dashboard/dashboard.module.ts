import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { DashboardPomodoroProgressComponent } from './dashboard-pomodoro-progress/dashboard-pomodoro-progress.component';
import { DashboardTaskItemComponent } from './dashboard-task-item/dashboard-task-item.component';



@NgModule({
	declarations: [DashboardComponent, DashboardPomodoroProgressComponent, DashboardTaskItemComponent],
	imports: [
		SharedModule,
		DashboardRoutingModule
	]
})
export class DashboardModule { }
