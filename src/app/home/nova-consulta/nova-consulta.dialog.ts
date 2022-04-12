import { Component, OnInit } from '@angular/core';
import NovaConsultaService from './nova-consulta.service';
import { MatDialog } from '@angular/material/dialog';
import DoctorSpecificities from 'src/app/models/DoctorSpecificities';
import { HotToastService } from '@ngneat/hot-toast';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, filter, map } from 'rxjs';
import Doctor from 'src/app/models/Doctor';

@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.dialog.html',
  styleUrls: ['./nova-consulta.dialog.scss'],
})
export class NovaConsultaDialog implements OnInit {
  form!: FormGroup;
  doctors:Doctor[] = []
  specificities:DoctorSpecificities[] = [];
  dates = [
    {
      id: 1,
      value: '11/04/2022'
    },
    {
      id: 2,
      value: '15/04/2022'
    },
    {
      id: 3,
      value: '31/04/2022'
    },
    {
      id: 4,
      value: '05/05/2022'
    },
  ];
  hours = [
    {
      value:'09:30'
    },
    {
      value:'10:30'
    },
    {
      value:'11:30'
    },
    {
      value:'14:30'
    }
  ]

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private novaConsultaService:NovaConsultaService,
    private toastService: HotToastService
    ) {
    this.form = this.fb.group({
      specificities: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.novaConsultaService.loadSpecificities().pipe(catchError((error) => {
      if(error){
        this.toastService.error(`Erro ao desmarcar consulta ${JSON.stringify(error.error)}`)
      }
      return EMPTY
    })).subscribe(
      data => {
        this.specificities = data;

      }
      );
    }

    loadDoctors(specificitiesId:number){
      this.novaConsultaService.loadDoctors().pipe(map((filteredDoctors) => {
        return filteredDoctors.filter(item => item.especialidade.id === specificitiesId)
      })).subscribe(
         data => this.doctors = data
      );
    }

  createAppointment() {

    const Appointment = {
      agenda_id: Math.floor(Math.random() * 10),
      horario: this.form.value.hour
    }
    this.novaConsultaService.createAppointment(Appointment).pipe(catchError((error) => {
      if(error){
        this.toastService.error(`Erro ao marcar consulta ${JSON.stringify(error.error)}`)
      }
      return EMPTY
    })).subscribe(

      );
  }
}
