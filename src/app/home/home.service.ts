import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import Consult from '../models/Consult';

@Injectable({ providedIn: 'root' })

export default class HomeService {
  constructor(
    private http: HttpClient,
  ) {}


  loadConsults() {
    return this.http.get<Consult[]>(`${environment.api}/consultas`,{
      headers:{
        'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
        ,
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  markOffConsult(consultId:number) {
    return this.http.delete<void>(`${environment.api}/consultas/${consultId}`,{
      headers:{
        'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
        ,
      }
    }).pipe(map(response => {
      return response;
    }));
  }

}
