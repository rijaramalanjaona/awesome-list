import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {Subscription} from 'rxjs';
import {User} from '../../models/user';

@Component({
	selector: 'al-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
	public prefix = 'app';
	public dashboardPath = `${this.prefix}/dashboard`;
	public parametersPath = `${this.prefix}/parameters`;
	public planningPath = `${this.prefix}/planning`;
	public profilPath = `${this.prefix}/profil`;
	public workdayPath = `${this.prefix}/workday`;

	public subscription: Subscription;
	public user: User;

	constructor(private router: Router, private authService: AuthService) { }

	public navigate(page: string): void {
		this.router.navigate([page]);
	}

	public isActive(page: string): boolean {
		return this.router.isActive(page, true);
	}

	ngOnInit(): void {
		this.subscription = this.authService.user$.subscribe(
			user => this.user = user
		);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

}
