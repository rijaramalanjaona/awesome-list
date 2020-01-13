import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../../shared/models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// état user
	private user: BehaviorSubject<User|null> = new BehaviorSubject(null);

	public readonly user$: Observable<User|null> = this.user.asObservable();

	constructor(private http: HttpClient) { }

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

		return this.http.post<User>(url, data, httpOptions);
	}

	public logout(): Observable<null> {
		return of(null);
	}

}
