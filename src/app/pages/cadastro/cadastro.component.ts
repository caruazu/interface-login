import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

interface CadastroForm {
  username: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
  selector: 'app-cadastro',
  imports: [LayoutComponent, ReactiveFormsModule, InputPrimaryComponent],
  providers: [LoginService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})

export class CadastroComponent {
  cadastroForm!: FormGroup<CadastroForm>;

  constructor(private router: Router, private loginService: LoginService) {
    this.cadastroForm = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.minLength(3),]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(12),]),
      passwordConfirm: new FormControl('', [Validators.required,Validators.minLength(12),]),
    });
  }

  navigate() {
    this.router.navigate([""])
  }

  submit() {
    const values = this.cadastroForm.value
    this.loginService.signup(values.username,values.email,values.password).subscribe({
      next: () => console.log('sucesso'),
      error: () => console.log('error'),
    })
  }
}
