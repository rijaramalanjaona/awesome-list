import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from '../../services/layout.service';
import {Subscription} from 'rxjs';
import {User} from '../../../shared/models/user';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'al-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
	public user: User;
	private subscription: Subscription;

	public homePath = 'home';
	public loginPath = 'login';
	public registerPath = 'register';

	constructor(private router: Router, private layoutService: LayoutService, private authService: AuthService) { }

	public isActive(page: string): boolean {
		return this.router.isActive(page, true);
	}

	public navigate(page: string): void {
		this.router.navigate([page]);
	}

	public toggleSidenav() {
		this.layoutService.toggleSidenav();
	}

	ngOnInit() {
		this.subscription = this.authService.user$.subscribe(
			user => this.user = user
		);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

}
