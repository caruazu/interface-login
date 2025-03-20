import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RespostaComponent } from "../../components/resposta/resposta.component";

interface LoginForm {
  username: FormControl;
  password: FormControl;
  captcha: FormControl;
}

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    LayoutComponent,
    ReactiveFormsModule,
    InputPrimaryComponent,
    NgxCaptchaModule,
    RespostaComponent,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public readonly siteKey = environment.siteKey;

  loginForm!: FormGroup<LoginForm>;

  loginStatusMessage: string = '';
  loginSuccess: boolean = false;
  isLoading: boolean = false;

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
    this.isLoading = true;
    this.loginService
      .login(values.username, values.password, values.captcha)
      .subscribe({
        next: () => {
          this.loginStatusMessage = 'Login efetuado com sucesso!';
          this.isLoading = false;
          this.loginSuccess = true;
        },
        error: () => {
          this.loginStatusMessage =
            'Falha ao efetuar o login. Por favor, tente novamente.';
          this.isLoading = false;
          this.loginSuccess = false;
        },
      });
  }

  navigate() {
    this.router.navigate(['cadastro']);
  }

  handleSuccess(captchaResponse: string): void {
    this.loginForm.get('captcha')?.setValue(captchaResponse);
  }
}
