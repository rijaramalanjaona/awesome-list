import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BsLocaleService} from 'ngx-bootstrap';

@Component({
	selector: 'al-workday-form-date',
	templateUrl: './workday-form-date.component.html',
	styles: []
})
export class WorkdayFormDateComponent implements OnInit {
	@Input()
	dueDate: FormControl;

	constructor(private localeService: BsLocaleService) { }

	ngOnInit() {
		this.localeService.use('fr');
	}

}
