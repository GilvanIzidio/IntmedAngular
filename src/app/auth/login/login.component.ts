import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AuthenticationService from 'src/app/services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formData!: FormGroup;
  hide = true;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: HotToastService
  ) { }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      saveCredentials: false,
    });
    this.recoveryUserDataAsyncStorageToForm()
  }

  recoveryUserDataAsyncStorageToForm() {
    const user = localStorage.getItem("medicar:SavedUser")
    if (user) {
      const { username, password } = JSON.parse(user);
      this.formData.patchValue({ username, password })
    }
  }



  login() {
    this.loading = true;
    const AuthenticationData = {
      "username": this.formData.value.username,
      "password": this.formData.value.password
    }

    this.authenticationService.login(AuthenticationData).pipe(catchError((error) => {
      if(error){
          this.toastService.error(`Erro ao realizar login ${error?.message}`)
          this.loading = false;
      }
      return EMPTY
    })).subscribe(
      (_) => {
        if (this.formData.value.saveCredentials) {
          const userData = {
            username: this.formData.value.username,
            password: this.formData.value.password
          }
          localStorage.setItem('medicar:SavedUser', JSON.stringify(userData))
        }else{
          localStorage.removeItem('medicar:SavedUser')
        }
        this.router.navigate(["/home"]);
        this.loading = false;
      },

    );
  }
}
