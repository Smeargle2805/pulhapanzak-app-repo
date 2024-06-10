import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonInputPasswordToggle, IonItem, IonLabel, IonRouterLink, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserDto } from 'src/app/shared/models/user-interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton, IonIcon, ReactiveFormsModule, RouterLink, IonRouterLink, IonInputPasswordToggle]
})
export class RegisterPage {

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  toastController: ToastController = inject(ToastController);

  registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', Validators.required],
    dni: ['', [Validators.required, Validators.minLength(13), Validators.pattern(/^\d+$/)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^\d+$/)]],

  });

  get isEmailInvalid(): boolean {
    const control = this.registerForm.get('email');
    return control ? control.hasError('email') && control.touched : false;
  }

  get isEmailRequired(): boolean {
    const control = this.registerForm.get('email');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isNameRequired(): boolean {
    const control = this.registerForm.get('name');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isLastNameRequired(): boolean {
    const control = this.registerForm.get('lastname');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isPasswordRequired(): boolean {
    const control = this.registerForm.get('password');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isDNIValid(): boolean {
    const control = this.registerForm.get('dni');
    return control ? control.hasError('pattern') && control.touched : false;
  }

  get isPhoneNumberValid(): boolean {
    const control = this.registerForm.get('phoneNumber');
    return control ? control.hasError('pattern') && control.touched : false;
  }

  get isFormInvalid(): boolean {
    return this.registerForm.invalid;
  }

  createUser(user: UserDto): void {
    this.authService.createUserInFirestore(user);
  }

  onSubmit(): void {
    if (!this.isFormInvalid) {
      const user: UserDto = this.registerForm?.value;
      user.imageProfile = '';
      this.authService
        .createUserWithEmailAndPassword(user)
        .then(() => {
          this.showAlert('Usuario registrado correctamente', false);
          this._router.navigate(['/login-page']);
        })
        .catch((error) => {
          console.error(error);
          this.showAlert('Error al registrar el usuario', true);
        });
    }
  }

  async showAlert(message: string, error: boolean = false): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      color: error ? 'danger' : 'success',
    });
    await toast.present();
  }
}
