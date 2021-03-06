import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import {LoginRoutingModule} from './login-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';



@NgModule({
	declarations: [LoginComponent, LoginFormComponent],
	imports: [
		SharedModule,
		LoginRoutingModule // pour le lazy loading de LoginModule
	]
})
export class LoginModule { }
