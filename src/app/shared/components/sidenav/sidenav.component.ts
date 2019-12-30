import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'al-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
	public prefix = 'app';
	public dashboardPath = `${this.prefix}/dashboard`;
	public parametersPath = `${this.prefix}/parameters`;
	public planningPath = `${this.prefix}/planning`;
	public profilPath = `${this.prefix}/profil`;
	public workdayPath = `${this.prefix}/workday`;

	constructor(private router: Router) { }

	public navigate(page: string): void {
		this.router.navigate([page]);
	}

	public isActive(page: string): boolean {
		return this.router.isActive(page, true);
	}

}
