import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from '../../services/evento/evento.service';
import { NewEventRequest } from '../../interfaces/new-event-request';

@Component({
  selector: 'app-nuevo-evento',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-evento.component.html',
  styleUrl: './nuevo-evento.component.css'
})
export class NuevoEventoComponent {
  EventForm: FormGroup;
  EventError: String = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private eventoService: EventoService){
    this.EventForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.EventForm.valid) {
      const eventDetails: NewEventRequest = {
        nombre: this.EventForm.value.nombre,
        descripcion: this.EventForm.value.descripcion,
        fecha: this.EventForm.value.fecha,
        hora: this.EventForm.value.hora,
        categoria: this.EventForm.value.categoria,
        ubicacion: this.EventForm.value.ubicacion
      };

      this.eventoService.SaveEvent(eventDetails).subscribe(
        () => {
          // Registro exitoso, redirigir al formulario de inicio de sesión
          this.router.navigateByUrl('/inicio');
        },
        error => {
          console.error('Error al registrar usuario:', error);
          this.EventError = 'Error al registrar usuario. Por favor, inténtalo de nuevo.';
        }
      );
    } else {
      // El formulario es inválido, mostrar mensaje de error
      this.EventError = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
