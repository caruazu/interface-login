import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

interface LoginForm {
  email: FormControl,
  password: FormControl,
}

@Component({
  selector: 'app-login',
  imports: [LayoutComponent, ReactiveFormsModule, InputPrimaryComponent],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
      ]),
    });
  }

  submit() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => console.log('sucesso'),
        error: () => console.log('error'),
      });
  }

  navigate() {
    this.router.navigate(['cadastro']);
  }
}
