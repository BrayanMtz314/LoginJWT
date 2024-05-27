import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../../services/evento/evento.service';
import { NewEventRequest } from '../../interfaces/new-event-request';
import { UpdateEventRequest } from '../../interfaces/update-event-request';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css'
})
export class UpdateEventComponent{
  EventError: String = '';
  idEventoActual: number = 0;
  
  EventForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    categoria: ['', Validators.required],
    ubicacion: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, private router: Router, private eventoService: EventoService, private activedRoute: ActivatedRoute){
    this.activedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.eventoService.getEventById(id).subscribe({
          next: (evento) => {
            this.idEventoActual = evento.id;
            this.EventForm.controls.nombre.setValue(evento.nombre);
            this.EventForm.controls.descripcion.setValue(evento.descripcion);
            this.EventForm.controls.ubicacion.setValue(evento.ubicacion);
            this.EventForm.controls.categoria.setValue(evento.categoria);
            this.EventForm.controls.fecha.setValue(evento.fecha);
            this.EventForm.controls.hora.setValue(evento.hora);
          },
          error: (err) => {
            console.error('Error fetching event:', err);
          }
        });
      } else {
        console.error('No event ID provided in the route');
      }
    });
  }


  onSubmit(): void {
    if (this.EventForm.valid) {
      const eventDetails: UpdateEventRequest = {
        id: this.idEventoActual,
        nombre: this.EventForm.value.nombre ?? '',
        descripcion: this.EventForm.value.descripcion ?? '',
        fecha: this.EventForm.value.fecha ?? '',
        hora: this.EventForm.value.hora ?? '',
        categoria: this.EventForm.value.categoria ?? '',
        ubicacion: this.EventForm.value.ubicacion ?? ''
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
