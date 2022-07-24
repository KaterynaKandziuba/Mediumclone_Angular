import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CurrentUserInterface } from '../../auth/shared/types/currentUser.interface';
import { RegisterRequestInterface } from '../../auth/shared/types/registerRequest.interface';
import { environment } from '../../../environments/environment.prod';
import { AuthResponseInterface } from '../../auth/types/authResponce.interface';
import { LoginRequestInterface } from '../../auth/shared/types/loginRequest.interface';

// makes class available to be injected as dependency
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(responce: AuthResponseInterface): CurrentUserInterface {
    return responce.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this.http.post<AuthResponseInterface>(url, {user: data}).pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';
    return this.http.post<AuthResponseInterface>(url, {user: data}).pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/user'
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser))
  }
}
