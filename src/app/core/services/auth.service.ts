import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../../shared/models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, finalize, switchMap, tap} from 'rxjs/operators';
import {UsersService} from './users.service';
import {ErrorService} from './error.service';
import {LoaderService} from './loader.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// état user
	private user: BehaviorSubject<User|null> = new BehaviorSubject(null);

	public readonly user$: Observable<User|null> = this.user.asObservable();

	// tslint:disable-next-line:max-line-length
	constructor(private http: HttpClient, private usersService: UsersService, private errorService: ErrorService, private loaderService: LoaderService) { }

	public login(email: string, password: string): Observable<User|null> {
		// TODO 1 faire un appel au backend
		const url = `${environment.firebase.auth.baseURL}signInWithPassword?key=${environment.firebase.apiKey}`;

		const data = {
			email,
			password,
			returnSecureToken: true
		};

		const httpOptions = {
			headers: new HttpHeaders({'Content-Type': 'application/json'})
		};

		return this.http.post<User>(url, data, httpOptions);
		// TODO 2 maj l'état user en fonction de la réponse du backend
		// TODO 3 maj retourner la réponse du backend sous la forme d'un Observable pour le composant qui déclenche l'action

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

				return this.usersService.save(user, jwt);
			}),

			// maj état user
			tap(user => this.user.next(user)),

			// gestion erreurs
			catchError(error => this.errorService.handleError(error)),

			// faire patienter les utilisateurs
			finalize(() => this.loaderService.setLoading(false))
		);
	}

	public logout(): Observable<null> {
		return of(null);
	}

}
