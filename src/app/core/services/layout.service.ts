import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

/**
 * Ce service permet de gérer l'affichage du menu latéral de l'espace membre
 */
@Injectable({
	providedIn: 'root'
})
export class LayoutService {
	// état isSidenavCollapsed
	private isSidenavCollapsed: BehaviorSubject<boolean> = new BehaviorSubject(false);

	public readonly isSidenavCollapsed$: Observable<boolean> = this.isSidenavCollapsed.asObservable();

	constructor() { }

	public toggleSidenav() {
		this.isSidenavCollapsed.next(!this.isSidenavCollapsed.value);
	}
}
