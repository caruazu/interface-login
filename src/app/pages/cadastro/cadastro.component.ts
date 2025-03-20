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
import { CommonModule } from '@angular/common';
import { RespostaComponent } from '../../components/resposta/resposta.component';

interface CadastroForm {
  username: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule,
    LayoutComponent,
    ReactiveFormsModule,
    InputPrimaryComponent,
    RespostaComponent,
  ],
  providers: [LoginService],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  cadastroForm!: FormGroup<CadastroForm>;

  loginStatusMessage: string = '';
  loginSuccess: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {
    this.cadastroForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
      ]),
    });
  }

  navigate() {
    this.router.navigate(['']);
  }

  submit() {
    const values = this.cadastroForm.value;
    this.isLoading = true;
    this.loginService
      .signup(values.username, values.email, values.password)
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
}
