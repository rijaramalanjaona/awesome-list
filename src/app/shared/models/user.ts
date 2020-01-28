export class User {
	readonly id: string; // id de l’utilisateur
	email: string; // email de l’utilisateur
	name: string; // nom de l’utilisateur
	avatar: string; // url vers la photo de profil de l’utilisateur
	pomodoroDuration: number; // duree des pomodoros

	/**
	 * ajouter un typage au parametre options => options contient une liste de proprietes facultatives (?) avec des noms identiques aux
	 * proprietes de l'objet pour eviter les constructeurs du genre new User(4)
	 * Ex correct : new User({ email: 'john.doe@awesome.com' })
	 */
	constructor(options: {
		id?: string,
		email?: string,
		name?: string,
		avatar?: string,
		pomodoroDuration?: number,
	} = {}) {
		this.id = options.id || null;
		this.email = options.email || '';
		this.name = options.name || '';
		this.avatar = options.avatar || '';
		this.pomodoroDuration = options.pomodoroDuration || 1500; // 25 min par defaut
	}

	// getter pour l'attribut roles
	get roles(): string[] {
		return this.email.endsWith('google.com') ? ['USER', 'EMPLOYEE'] : ['USER'];
	}

	hasRole(role: string): boolean {
		return this.roles.includes(role);
	}
}
