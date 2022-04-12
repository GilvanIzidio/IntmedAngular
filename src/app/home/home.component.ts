import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import HomeService from './home.service';
import { HotToastService } from '@ngneat/hot-toast';
import { NovaConsultaDialog } from './nova-consulta/nova-consulta.dialog';
import Consult from '../models/Consult';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns = [
    'especialidade',
    'profissional',
    'data',
    'hora',
    'desmarcar',
  ];

  public username = ''
  public loadingMarkOff = false
  public consults:Consult[] = [] as Consult[];


  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<NovaConsultaDialog>,
    private router: Router,
    private homeService:HomeService,
    private toastService: HotToastService,
    ) {}

  ngOnInit(): void {
    this.getUserName()
    this.loadConsults()
  }

  getUserName(){
    const user = localStorage.getItem("medicar:user")
    if (user) {
      const {username} = JSON.parse(user);
      this.username = username
    }
  }

  loadConsults(){
    this.homeService.loadConsults().pipe(catchError((error) => {
      if(error){
         this.toastService.error(`Erro ao carregar consultas ${JSON.stringify(error.error)}`)
           }
          return EMPTY
    })).subscribe(
      (data) => {
        this.consults = data
      }
    );
  }


  logout() {
    const keysToRemove = ['medicar:user','medicar:token'];
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
    });

    this.router.navigate(['login']);
  }

  markOff(consultId: number) {
    this.loadingMarkOff = true
      this.homeService.markOffConsult(consultId).pipe(catchError((error) => {
    if(error){
      this.toastService.error(`Erro ao desmarcar consulta ${JSON.stringify(error.error)}`)
    }
    return EMPTY
  })).subscribe(_ => {
        this.loadConsults()
         this.loadingMarkOff = false
  });
  }

  newAppointment() {
    const dialog = this.dialog.open(NovaConsultaDialog, {
      width: '600px',
    });
    dialog.afterClosed().subscribe(
      (_) => this.loadConsults()
    )
  }
}
