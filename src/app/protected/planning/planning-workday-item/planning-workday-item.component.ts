import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'al-planning-workday-item',
	templateUrl: './planning-workday-item.component.html',
	styles: []
})
export class PlanningWorkdayItemComponent implements OnInit {
	@Input()
	workday;

	constructor() { }

	ngOnInit() {
	}

}
