import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginUserData,ResponseLogin,CompleteUserData } from '../auth/auth.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })


export default class AuthenticationService {

  constructor(
    private http: HttpClient,
    ) {}

  public setDataIntoLocalStorage({password,token,username}:CompleteUserData) {
    localStorage.setItem('medicar:token', token);
    localStorage.setItem('medicar:user', JSON.stringify({username:username,password:password}))
  }

  login(credentials:LoginUserData) {
    return this.http.post<ResponseLogin>(`${environment.api}/users/login`, credentials).pipe(map(response => {
      this.setDataIntoLocalStorage({username:credentials.username,password:credentials.password,token:response.token});
      return response;
    }));
  }
}
