import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import Doctor from 'src/app/models/Doctor';
import {AppointmentRequest,AppointmentResponse} from 'src/app/models/Appointment';
import DoctorSpecificities from '../../models/DoctorSpecificities';

@Injectable({ providedIn: 'root' })

export default class NovaConsultaService {
  constructor(
    private http: HttpClient,
  ) {}


  loadSpecificities() {
    return this.http.get<DoctorSpecificities[]>(`${environment.api}/especialidades`,{
      headers:{
        'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
        ,
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  loadDoctors() {
    return this.http.get<Doctor[]>(`${environment.api}/medicos`,{
      headers:{
        'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
        ,
      }
    }).pipe(map(response => {
      return response;
    }));
  }

  createAppointment(data:AppointmentRequest){
    return this.http.post<AppointmentResponse>(`${environment.api}/consultas`,data,{
      headers:{
        'Authorization': `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`
        ,
      }
    }).pipe(map(response => {
      return response;
    }));
  }

}
