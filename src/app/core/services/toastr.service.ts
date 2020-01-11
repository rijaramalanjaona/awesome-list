import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {Toastr} from '../../shared/models/toastr';
import {take} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ToastrService {

	private toastr: BehaviorSubject<Toastr|null> = new BehaviorSubject(null);

	public readonly  toastr$: Observable<Toastr|null> = this.toastr.asObservable();

	constructor() { }

	public showToastr(toaster: Toastr): void {
		timer(0, 3000).pipe(take(2)).subscribe(i => {
			if (i === 0) {
				this.toastr.next(toaster);
			} else {
				this.toastr.next(null);
			}
		});
	}
}
