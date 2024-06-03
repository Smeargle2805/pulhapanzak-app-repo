import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInputPasswordToggle, IonLabel, IonModal, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/auth/models/login';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonLabel, IonInputPasswordToggle, IonButton, ReactiveFormsModule, IonModal],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get isEmailInvalid(): boolean {
    const emailControl = this.loginForm.get('email');
    return emailControl ? emailControl.hasError('email') && emailControl.touched : false;
  }

  get isEmailRequired(): boolean {
    const emailControl = this.loginForm.get('email');
    return emailControl ? emailControl.hasError('required') && emailControl.touched : false;
  }

  get isPasswordRequired(): boolean {
    const passwordControl = this.loginForm.get('password');
    return passwordControl ? passwordControl.hasError('required') && passwordControl.touched : false;
  }

  get isFormInvalid(): boolean {
    return this.loginForm.invalid;
  }

  onSubmit(): void {
    if (!this.isFormInvalid) {
      const loginData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.authService.signInWithEmailAndPassword(loginData).then(() => {
        this.router.navigate(['/home']);
        this.showAlert('Ha iniciado sesión correctamente');
      }).catch(() => {
        this.showAlert('Upps, correo o contraseña inválida', true);
      });
    }
  }

  async showAlert(message: string, isError: boolean = false): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      color: isError ? 'danger' : 'success',
    });
    await toast.present();
  }
}
