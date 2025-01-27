import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { environment } from '../../../environments/environment';

interface LoginForm {
  username: FormControl;
  password: FormControl;
  captcha: FormControl;
}

@Component({
  selector: 'app-login',
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    InputPrimaryComponent,
    NgxCaptchaModule,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public readonly siteKey = environment.siteKey;

  loginForm!: FormGroup<LoginForm>;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
      ]),
      captcha: new FormControl('', Validators.required),
    });
  }

  submit() {
    const values = this.loginForm.value;
    this.loginService
      .login(values.username, values.password, values.captcha)
      .subscribe({
        next: () => console.log('sucesso'),
        error: () => console.log('error'),
      });
  }

  navigate() {
    this.router.navigate(['cadastro']);
  }

  handleSuccess(captchaResponse: string): void {
    this.loginForm.get('captcha')?.setValue(captchaResponse);
  }
}
