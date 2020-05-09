import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Workday } from '../../shared/models/workday';
import { environment } from '../../../environments/environment';
import { Task } from 'src/app/shared/models/task';
import { LoaderService } from './loader.service';
import { ToastrService } from './toastr.service';
import { ErrorService } from './error.service';
import {catchError, finalize, switchMap, tap} from 'rxjs/operators';
import {DateService} from './date.service';
import {Observable, of} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WorkdaysService {

	constructor(
		private http: HttpClient,
		private dateService: DateService,
		private loaderService: LoaderService,
		private toastrService: ToastrService,
		private errorService: ErrorService) { }

	save(workday: Workday) {
		const url = `${environment.firebase.firestore.baseURL}/workdays?key=${environment.firebase.apiKey}`;
		const data = this.getWorkdayForFirestore(workday);
		const jwt: string = localStorage.getItem('token');
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`
			})
		};

		// ajout du loader
		this.loaderService.setLoading(true);

		return this.http.post(url, data, httpOptions).pipe(
			// ajout du toastr
			tap(_ => this.toastrService.showToastr({
				category: 'success',
				message: 'Votre journée de travail a été enregistré avec succès.'
			})),

			// gestion des erreurs
			catchError(error => this.errorService.handleError(error)),

			// retirer le loader
			finalize(() => this.loaderService.setLoading(false))
		);
	}

	getWorkdayByDate(date: string): Observable<Workday|null> {
		const url = `${environment.firebase.firestore.baseURL}:runQuery?key=${environment.firebase.apiKey}`;
		const data = this.getStructuredQuery(date);
		const jwt: string = localStorage.getItem('token');

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`
			})
		};

		return this.http.post(url, data, httpOptions).pipe(
			switchMap((responseData: any) => {
				const document = responseData[0].document;
				if (!document) {
					return of(null);
				}
				return of(this.getWorkdayFromFirestore(document.name, document.fields));
			})
		);
	}

	update(workday: Workday) {
		const url = `${environment.firebase.firestore.baseURL}/workdays/${workday.id}?key=${environment.firebase.apiKey}
		&currentDocument.exists=true`;

		const data = this.getWorkdayForFirestore(workday);
		const jwt: string = localStorage.getItem('token');
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`
			})
		};

		// ajout du loader
		this.loaderService.setLoading(true);

		return this.http.patch(url, data, httpOptions).pipe(
			// ajout du toastr
			tap(_ => this.toastrService.showToastr({
				category: 'success',
				message: 'Votre journée de travail a été sauvegardée avec succès.'
			})),

			// gestion des erreurs
			catchError(error => this.errorService.handleError(error)),

			// retirer le loader
			finalize(() => this.loaderService.setLoading(false))
		);
	}

	private getWorkdayForFirestore(workday: Workday) {
		const date: number = new Date(workday.dueDate).getTime(); // date => dueDate
		const displayDate: string = this.dateService.getDisplayDate(new Date(workday.dueDate));
		const tasks = this.getTaskListForFirestore(workday.tasks);

		return {
			fields: {
				dueDate: { integerValue: date },
				displayDate: { stringValue: displayDate },
				tasks,
				notes: { stringValue: workday.notes },
				userId: { stringValue: workday.userId }
			}
		};
	}

	private getTaskListForFirestore(tasks: Task[]) {
		const taskList = {
			arrayValue: {
				values: []
			}
		};

		tasks.forEach(task => {
			taskList.arrayValue.values.push(this.getTaskForFirestore(task));
		});

		return taskList;
	}

	private getTaskForFirestore(task: Task) {
		return {
			mapValue: {
				fields: {
					title: { stringValue: task.title },
					todo: { integerValue: task.todo },
					done: { integerValue: task.done },
					completed: { booleanValue: false }
				}
			}
		};
	}

	private getStructuredQuery(date: string): any {
		return {
			structuredQuery: {
				from: [{
					collectionId: 'workdays'
				}],
				where: {
					fieldFilter: {
						field: { fieldPath: 'displayDate' },
						op: 'EQUAL',
						value: { stringValue: date }
					}
				},
				limit: 1
			}
		};
	}

	private getWorkdayFromFirestore(name, fields): Workday {
		const tasks: Task[] = [];
		const workdayId: string = name.split('/')[6];

		fields.tasks.arrayValue.values.forEach(data => {
			const task: Task = new Task({
				completed: data.mapValue.fields.completed.booleanValue,
				done: data.mapValue.fields.done.integerValue,
				title: data.mapValue.fields.title.stringValue,
				todo: data.mapValue.fields.title.integerValue
			});
			tasks.push(task);
		});

		return new Workday({
			id: workdayId,
			userId: fields.userId.stringValue,
			notes: fields.notes.stringValue,
			displayDate: fields.displayDate.stringValue,
			dueDate: fields.dueDate.integerValue,
			tasks
		});
	}
}
