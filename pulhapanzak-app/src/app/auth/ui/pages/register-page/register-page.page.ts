import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonInputPasswordToggle, IonItem, IonLabel, IonRouterLink, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { User } from 'src/app/Models/IUser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton, IonIcon, ReactiveFormsModule, RouterLink, IonRouterLink, IonInputPasswordToggle]
})
export class RegisterPage{

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      identityNumber: ['', [Validators.required, Validators.minLength(13), Validators.pattern(/^\d+$/)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^\d+$/)]]
    });
  }

  get isFirstNameInvalid(): boolean { return this.registerForm.get('firstName')!.invalid && (this.registerForm.get('firstName')!.dirty || this.registerForm.get('firstName')!.touched); }
  get isLastNameInvalid(): boolean { return this.registerForm.get('lastName')!.invalid && (this.registerForm.get('lastName')!.dirty || this.registerForm.get('lastName')!.touched); }
  get isEmailInvalid(): boolean { return this.registerForm.get('email')!.invalid && (this.registerForm.get('email')!.dirty || this.registerForm.get('email')!.touched); }
  get isPasswordInvalid(): boolean { return this.registerForm.get('password')!.invalid && (this.registerForm.get('password')!.dirty || this.registerForm.get('password')!.touched); }
  get isIdentityNumberInvalid(): boolean { return this.registerForm.get('identityNumber')!.invalid && (this.registerForm.get('identityNumber')!.dirty || this.registerForm.get('identityNumber')!.touched); }
  get isPhoneNumberInvalid(): boolean { return this.registerForm.get('phoneNumber')!.invalid && (this.registerForm.get('phoneNumber')!.dirty || this.registerForm.get('phoneNumber')!.touched); }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      console.log('User Registered:', user);
    }
  }
}
