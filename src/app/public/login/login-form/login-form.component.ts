import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
	selector: 'al-login-form',
	templateUrl: './login-form.component.html',
	styles: []
})
export class LoginFormComponent implements OnInit {

	loginForm: FormGroup;

	constructor(private fb: FormBuilder, private router: Router) { }

	ngOnInit() {
		this.loginForm = this.fb.group({
			'email': ['', [
				Validators.required,
				Validators.email
			]],
			'password': ['', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(20)
			]]
		});
	}

	get email() {
		return this.loginForm.get('email');
	}

	get password() {
		return this.loginForm.get('password');
	}

	submit() {
		// tslint:disable-next-line:no-console
		console.info(this.email.value);
		// tslint:disable-next-line:no-console
		console.info(this.password.value);
		this.router.navigate(['/app/dashboard']);
	}
}
