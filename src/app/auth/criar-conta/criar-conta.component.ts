import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl,ValidationErrors,ValidatorFn } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import CreateAccountService from './createAccount.service';
import { CreateAccount, LoginUserData } from '../auth.model';
import AuthenticationService from 'src/app/services/authentication.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss'],
})

export class CriarContaComponent implements OnInit {
  form!: FormGroup;
  hide = true;
  hideConfirmationPassword = true;

  constructor(
    private fb: FormBuilder,
    private toastService: HotToastService,
    private createAccountService: CreateAccountService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  redirectUserAfterCreateAccount(username: string) {
    const userData: LoginUserData = {
      username,
      password: this.form.value.password
    }
    this.authenticationService.login(userData).pipe(catchError((error) => {
      if(error){
        this.toastService.error(`Erro ao redirecionar ${error?.message}`)
      }
      return EMPTY
    })).subscribe(
      () => {
        this.toastService.info(`Login Efetuado`)
        this.router.navigate(["/home"]);
      }
    )
  }

  prepareFormToSubmit(){
    if(this.form.invalid){
      this.toastService.info(`Preencha corretamente todos os campos`)
      return
    }

    if(this.form.value.password !== this.form.value.passwordConfirmation){
      this.toastService.warning(`As senhas devem ser iguais`)
      return
    }

    const credentials: CreateAccount = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.createAccount(credentials)
  }



  createAccount(credentials: CreateAccount) {
    this.createAccountService.create(credentials).pipe(catchError((error) => {
      if(error){
        this.toastService.error(`Erro ao criar nova conta ${error?.message}`)
      }
      return EMPTY
    })).subscribe(
      (data) => {
        this.redirectUserAfterCreateAccount(data.username)
      }
    );
  }
}
