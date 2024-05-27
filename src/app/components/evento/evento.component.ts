import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento/evento.service';
import { Evento } from '../../interfaces/evento';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { LoginService } from '../../services/auth/login.service';
import { PersonasRegistradasComponent } from '../personas-registradas/personas-registradas.component';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [PersonalDetailsComponent, PersonasRegistradasComponent, RouterLink],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent implements OnInit{
  userLoginOn: boolean = false; // Cambié 'Boolean' a 'boolean' (tipo primitivo de TypeScript)
  evento: Evento = {
    id: 0,
    nombre: '',
    descripcion: '',
    fecha: '',
    hora: '',
    categoria: '',
    ubicacion: ''
  };

  constructor(
    private router: ActivatedRoute, // Agregué 'private' para inyección de dependencias
    private eventosService: EventoService, // Agregué 'private' para inyección de dependencias
    private loginService: LoginService
  ) {
    this.router.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.eventosService.getEventById(id).subscribe({
          next: (evento) => {
            this.evento = evento;
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

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
      error: (err) => {
        console.error('Error fetching user login status:', err);
      }
    });
  }
  
}
