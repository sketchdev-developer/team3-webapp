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
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(email, password): Observable<SessionData> {
    return this.http.post<SessionData>('/api/users', { email, password });
  }
}
