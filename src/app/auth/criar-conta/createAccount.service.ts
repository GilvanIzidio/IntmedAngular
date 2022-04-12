import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CreateAccount,LoginUserData } from '../auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })

export default class CreateAccountService {
  constructor(
    private http: HttpClient,
  ) {}

  create(data:CreateAccount) {
    return this.http.post<LoginUserData>(`${environment.api}/users`, data).pipe(map(response => {
      return response;
    }));
  }
}
