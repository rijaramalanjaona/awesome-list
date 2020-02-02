import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {User} from '../../../shared/models/user';

@Component({
	selector: 'al-profil',
	templateUrl: './profil.component.html',
	styles: []
})
export class ProfilComponent implements OnInit {
	profilForm: FormGroup;
	user: User;

	constructor(private fb: FormBuilder, private authService: AuthService) { }

	ngOnInit() {
		this.user = this.authService.currentUser;

		this.profilForm = this.fb.group({
			name: [this.user.name, [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(20),
				Validators.pattern('^[a-zA-Z0-9_-]*$')
			]],
			avatar: [this.user.avatar, [
				Validators.pattern('https?://.+') // url d'image valide
			]]
		});
	}

	get name() {
		return this.profilForm.get('name');
	}

	get avatar() {
		return this.profilForm.get('avatar');
	}

	onSubmit() {
		this.user.name = this.name.value;
		this.user.avatar = this.avatar.value;
		this.authService.updateUserState(this.user).subscribe();
	}

}
