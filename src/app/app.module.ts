import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		CoreModule, // on importe les "vraies" routes
		AppRoutingModule // la route générique en dernier
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
