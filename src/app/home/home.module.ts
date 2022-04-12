import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NovaConsultaDialog } from './nova-consulta/nova-consulta.dialog';
import { MatDialogRef } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent, NovaConsultaDialog],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers:[
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ]
})
export class HomeModule {}
