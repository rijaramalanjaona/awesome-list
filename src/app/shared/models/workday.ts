import {Task} from './task';

export class Workday {
	readonly id: string; // identifiant de la journee de travail
	dueDate: number; // date a laquelle est prevue la journee de travail (timestamp)
	displayDate: string; // date d'affichage de la journée de travail 'jj/mm/aaaa'
	notes?: string; // facultatif : notes eventuelles prises par l'utilisateur
	tasks: Task[]; // la liste des taches a faire
	userId: string; // identifiant de l'utilisateur

	constructor(options: {
		id?: string,
		dueDate?: number,
		displayDate?: string,
		notes?: string,
		tasks?: Task[],
		userId: string // pas de ? = impossible de creer un workday sans user
	}) {
		this.id = options.id || null;
		this.dueDate = options.dueDate || 0;
		this.displayDate = options.displayDate || '';
		this.notes = options.notes || '';
		this.tasks = options.tasks || [new Task()];
		this.userId = options.userId;
	}
}
