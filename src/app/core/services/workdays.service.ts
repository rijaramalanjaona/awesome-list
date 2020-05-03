import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Workday} from '../../shared/models/workday';
import {environment} from '../../../environments/environment';
import { Task } from 'src/app/shared/models/task';

@Injectable({
	providedIn: 'root'
})
export class WorkdaysService {

	constructor(private http: HttpClient) { }

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

		return this.http.post(url, data, httpOptions);
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
