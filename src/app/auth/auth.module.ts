import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CriarContaComponent } from './criar-conta/criar-conta.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  { path: 'criar-conta', component: CriarContaComponent },
];

@NgModule({
  declarations: [LoginComponent, CriarContaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AuthModule {}
