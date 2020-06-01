import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// ajout JWT pour les requêtes non publiques
		if (!this.isPublicUrl(request.url)) {
			request = this.addToken(request, localStorage.getItem('token'));
		}

		// ajout Content-Type pour toutes les requêtes
		request = this.addContentType(request);

		return next.handle(request);
	}

	private addContentType(request: HttpRequest<any>): HttpRequest<any> {
		return request.clone({
			setHeaders: {
				'Content-Type': 'application/json'
			}
		});
	}

	private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
		return request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});
	}

	private isPublicUrl(url: string): boolean {
		// login url ressemble à https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=XXXXX
		// register url ressemble à https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=XXXXX
		return url.includes('signInWithPassword') || url.includes('signUp');
	}
}
