import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from '../../services/layout.service';

@Component({
	selector: 'al-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
	public homePath = 'home';
	public loginPath = 'login';
	public registerPath = 'register';

	constructor(private router: Router, private layoutService: LayoutService) { }

	public isActive(page: string): boolean {
		return this.router.isActive(page, true);
	}

	public navigate(page: string): void {
		this.router.navigate([page]);
	}

	public toggleSidenav() {
		this.layoutService.toggleSidenav();
	}
}
