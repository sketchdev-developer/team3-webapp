import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

class User {
  id: string;
  email: string;
  password: string;
}

class SessionData {
  token: string;
  user: User;
}

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  authenticateUser(email, password): Observable<SessionData> {
    return new Observable(observer => {
      if (email === 'valid@example.com' && password === 'ValidPassword123!') {
        const sessionData: SessionData = new SessionData();

        observer.next(sessionData);
        observer.complete();
      } else {
        observer.error('Invalid email/password combination');
      }
    });

    //return this.http.post('/api/sessions', { email, password });
  }
}
