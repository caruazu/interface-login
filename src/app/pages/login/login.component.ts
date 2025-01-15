import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';

@Component({
  selector: 'app-login',
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    InputPrimaryComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(12)])
    })
  }
}
