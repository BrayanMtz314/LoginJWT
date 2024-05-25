import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/auth/register.service';
import { RegisterRequest } from '../../interfaces/registerRequest';
import { NavComponent } from '../../shared/nav/nav.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationError: String = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private registerService: RegisterService){
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userDetails: RegisterRequest = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        country: this.registerForm.value.country
      };

      this.registerService.register(userDetails).subscribe(
        () => {
          // Registro exitoso, redirigir al formulario de inicio de sesión
          this.router.navigateByUrl('/inicio');
        },
        error => {
          console.error('Error al registrar usuario:', error);
          this.registrationError = 'Error al registrar usuario. Por favor, inténtalo de nuevo.';
        }
      );
    } else {
      // El formulario es inválido, mostrar mensaje de error
      this.registrationError = 'Por favor, completa todos los campos correctamente.';
    }
  }

}
