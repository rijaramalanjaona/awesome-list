import { NgModule } from '@angular/core';

import { ProtectedRoutingModule } from './protected-routing.module';
import { WorkdayModule } from './workday/workday.module';
import {SharedModule} from '../shared/shared.module';
import { ProtectedComponent } from './protected.component';


@NgModule({
	declarations: [ProtectedComponent],
	imports: [
		SharedModule,
		ProtectedRoutingModule,
		WorkdayModule
	]
})
export class ProtectedModule { }
