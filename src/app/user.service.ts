import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

class User {
	id: string;
	email: string;
	password: string;
	preferredBeverage: string;
}

class SessionData {
	token: string;
	user: User;
}

@Injectable()
export class UserService {
	sessionData: SessionData;

	constructor(private http: HttpClient) {
	}

	registerUser(email, password, beverage): Observable<SessionData> {
		return this.http.post<SessionData>('/api/users', {email, password, beverage});
	}

	saveSessionData(sessionData: SessionData) {
		this.sessionData = sessionData;
	}
}
