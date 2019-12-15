import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		PublicModule,
		ProtectedModule,
		BrowserAnimationsModule
	]
})
export class CoreModule {
	/**
	 * S’assurer que le CoreModule n’est importe qu’une seule fois
	 *
	 * @Optional: permet d’indiquer qu’une dependance est optionnelle.
	 * Si la dependance n’est pas renseignee, alors c’est la valeur null qui est injectee
	 *
	 * @SkipSelf: indique au mecanisme d’injection de dependance que la resolution de cette dependance doit commencer a partir
	 * de l’injecteur parent. Le CoreModule ne peut etre instancie qu’une fois, et depuis un module parent uniquement.
	 *
	 */
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error('CoreModule is already loaded');
		}
	}
}
