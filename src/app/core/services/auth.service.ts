import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../../shared/models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, delay, finalize, switchMap, tap} from 'rxjs/operators';
import {UsersService} from './users.service';
import {ErrorService} from './error.service';
import {LoaderService} from './loader.service';
import {Router} from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// état user
	private user: BehaviorSubject<User|null> = new BehaviorSubject(null);

	public readonly user$: Observable<User|null> = this.user.asObservable();

	// tslint:disable-next-line:max-line-length
	constructor(private http: HttpClient, private usersService: UsersService, private errorService: ErrorService, private loaderService: LoaderService, private router: Router) { }

	public login(email: string, password: string): Observable<User|null> {
		const url = `${environment.firebase.auth.baseURL}signInWithPassword?key=${environment.firebase.apiKey}`;

		const data = {
			email,
			password,
			returnSecureToken: true
		};

		const httpOptions = {
			headers: new HttpHeaders({'Content-Type': 'application/json'})
		};

		this.loaderService.setLoading(true);

		return this.http.post<User>(url, data, httpOptions).pipe(
			switchMap((responseData: any) => {
				const userId: string = responseData.localId;
				const jwt: string = responseData.idToken;

				// sauvegarde des infos d'authentification
				this.saveAuthData(userId, jwt);

				return this.usersService.get(userId, jwt);
			}),

			// maj l'état user
			tap(user => this.user.next(user)),

			// déconnexion automatique
			tap(_ => this.logoutTimer(3600)), // on déclenche la minuterie ici

			// gestion des erreurs
			catchError(error => this.errorService.handleError(error)),

			// faire patienter les utilisateurs
			finalize(() => this.loaderService.setLoading(false))
		);
	}

	public register(name: string, email: string, password: string): Observable<User|null> {
		const url = `${environment.firebase.auth.baseURL}signUp?key=${environment.firebase.apiKey}`;

		const data = {
			email,
			password,
			returnSecureToken: true
		};

		const httpOptions = {
			headers: new HttpHeaders({'Content-Type': 'application/json'})
		};

		this.loaderService.setLoading(true);

		return this.http.post(url, data, httpOptions).pipe(
			switchMap((responseData: any) => {
				const jwt: string = responseData.idToken;
				const user = new User({
					email: responseData.email,
					id: responseData.localId,
					name
				});

				// sauvegarde des infos d'authentification
				this.saveAuthData(user.id, jwt);

				return this.usersService.save(user, jwt);
			}),

			// maj état user
			tap(user => this.user.next(user)),

			// déconnexion automatique
			tap(_ => this.logoutTimer(3600)), // on déclenche la minuterie ici

			// gestion erreurs
			catchError(error => this.errorService.handleError(error)),

			// faire patienter les utilisateurs
			finalize(() => this.loaderService.setLoading(false))
		);
	}

	public logout(): void {
		localStorage.removeItem('expirationDate');
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		this.user.next(null);
		this.router.navigate(['/login']);
	}

	// Déclenche la minuterie pour la déconnexion automatique
	private logoutTimer(expirationTime: number): void {
		of(true).pipe(
			delay(expirationTime * 1000)
		).subscribe(_ => this.logout());
	}

	private saveAuthData(userId: string, token: string) {
		const now = new Date();
		const expirationDate = (now.getTime() + 3600 * 1000).toString();
		localStorage.setItem('expirationDate', expirationDate);
		localStorage.setItem('token', token);
		localStorage.setItem('userId', userId);
	}

	public autoLogin(user: User) {
		this.user.next(user);
		this.router.navigate(['/app/dashboard']);
	}
}
