export class Task {
	// pas de id : toutes les taches sont rattachees a un workday. Il n'y a pas de sauvegarde de tache en tant que telle
	static readonly pomodoroLimit: number = 5; // nombre maximum de pomodoros
	completed: boolean; // tache terminee ou non
	done: number; // nombre de pomodoros effectues
	title: string; // intitule de la tache
	todo: number; // nombre de pomodoros prevus

	constructor(options: {
		completed?: boolean,
		done?: number,
		title?: string,
		todo?: number
	} = {}) {
		this.completed = options.completed || false;
		this.done = options.done || 0;
		this.title = options.title || '';
		this.todo = options.todo || 1;
	}
}
