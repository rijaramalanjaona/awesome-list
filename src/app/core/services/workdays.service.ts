import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Workday} from '../../shared/models/workday';
import {environment} from '../../../environments/environment';
import { Task } from 'src/app/shared/models/task';
import {LoaderService} from './loader.service';
import {ToastrService} from './toastr.service';
import {ErrorService} from './error.service';
import {catchError, finalize, tap} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class WorkdaysService {

	constructor(
		private http: HttpClient,
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

			// retire le loader
			finalize(() => this.loaderService.setLoading(false))
		);
	}

	private getWorkdayForFirestore(workday: Workday) {
		const date: number = new Date(workday.dueDate).getTime();
		const tasks = this.getTaskListForFirestore(workday.tasks);

		return {
			fields: {
				dueDate: { integerValue: date },
				tasks,
				notes: { stringValue: workday.notes },
				userId: { stringValue: workday.userId}
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
					completed: { booleanValue: false}
				}
			}
		};
	}
}
