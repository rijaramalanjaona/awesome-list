import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../../shared/models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {switchMap, tap} from 'rxjs/operators';
import {UsersService} from './users.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// état user
	private user: BehaviorSubject<User|null> = new BehaviorSubject(null);

	public readonly user$: Observable<User|null> = this.user.asObservable();

	constructor(private http: HttpClient, private usersService: UsersService) { }

	public login(email: string, password: string): Observable<User|null> {
		// TODO 1 faire un appel au backend
		// TODO 2 maj l'état user en fonction de la réponse du backend
		// TODO 3 maj retourner la réponse du backend sous la forme d'un Observable pour le composant qui déclenche l'action
		return of(new User());
	}

	public register(name: string, email: string, password: string): Observable<User|null> {
		const url = `${environment.firebase.auth.baseURL}accounts:signUp?key=${environment.firebase.apiKey}`;

		const data = {
			email,
			password,
			returnSecureToken: true
		};

		const httpOptions = {
			headers: new HttpHeaders({'Content-Type': 'application/json'})
		};

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
			tap(user => this.user.next(user))
		);
	}

	public logout(): Observable<null> {
		return of(null);
	}

}
