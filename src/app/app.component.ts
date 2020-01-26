import {Component, OnInit} from '@angular/core';
import {UsersService} from './core/services/users.service';
import {AuthService} from './core/services/auth.service';

@Component({
	selector: 'al-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(private usersService: UsersService, private authService: AuthService) {}

	ngOnInit(): void {
		this.tryAutoLogin();
	}

	private tryAutoLogin() {
		// On vérifie s'il existe un jwt stocké
		const token = localStorage.getItem('token');
		if (!token) {
			return;
		}

		// On vérifie si le jwt est encore valide
		const expirationDate = +localStorage.getItem('expirationDate');
		const now = new Date().getTime();
		if (now >= expirationDate) {
			return;
		}

		// On connecte l'user avec les informations de connexion stockées
		const userId = localStorage.getItem('userId');
		this.usersService.get(userId, token)
			.subscribe(user => {
				this.authService.autoLogin(user);
			});
	}
}
