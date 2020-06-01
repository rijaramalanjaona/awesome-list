import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../shared/models/user';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {switchMap} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	constructor(private http: HttpClient) { }

	save(user: User): Observable<User|null> {
		const url = `${environment.firebase.firestore.baseURL}/users?key=${environment.firebase.apiKey}&documentId=${user.id}`;

		const data = this.getDataForFirestore(user);

		return this.http.post(url, data, {}).pipe(
			switchMap((responseData: any) => {
				return of(this.getUserFromFirestore(responseData.fields));
			})
		);
	}

	get(userId: string): Observable<User|null> {
		const url = `${environment.firebase.firestore.baseURL}:runQuery?key=${environment.firebase.apiKey}`;

		const data = this.getStructuredQuery(userId);

		return this.http.post(url, data, {}).pipe(
			switchMap((responseData: any) => {
				return of(this.getUserFromFirestore(responseData[0].document.fields));
			})
		);
	}

	update(user: User): Observable<User|null> {
		const url = `${environment.firebase.firestore.baseURL}/users/${user.id}?currentDocument.exists=true&key=${environment.firebase.apiKey}`;

		const data = this.getDataForFirestore(user);

		return this.http.patch(url, data, {}).pipe(
			switchMap((responseData: any) => {
				return of(this.getUserFromFirestore(responseData.fields));
			})
		);
	}

	// mapping User to Firestore
	private getDataForFirestore(user: User) {
		return {
			fields: {
				id: { stringValue: user.id },
				email: { stringValue: user.email },
				name: { stringValue: user.name },
				avatar: { stringValue: user.avatar },
				pomodoroDuration: { integerValue: user.pomodoroDuration }
			}
		};
	}

	// mapping Firestore to User
	private getUserFromFirestore(fields): User {
		return new User({
			id: fields.id.stringValue,
			email: fields.email.stringValue,
			name: fields.name.stringValue,
			avatar: fields.avatar.stringValue,
			pomodoroDuration: fields.pomodoroDuration.integerValue
		});
	}

	// tslint:disable-next-line:ban-types
	private getStructuredQuery(userId: string): Object {
		return {
			structuredQuery: {
				from: [{
					collectionId: 'users'
				}],
				where: {
					fieldFilter: {
						field: { fieldPath: 'id' },
						op: 'EQUAL',
						value: { stringValue: userId }
					}
				},
				limit: 1
			}
		};
	}
}
