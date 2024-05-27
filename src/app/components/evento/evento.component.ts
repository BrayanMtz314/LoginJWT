import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento/evento.service';
import { Evento } from '../../interfaces/evento';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { LoginService } from '../../services/auth/login.service';
import { PersonasRegistradasComponent } from '../personas-registradas/personas-registradas.component';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [PersonalDetailsComponent, PersonasRegistradasComponent, RouterLink],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent implements OnInit{
  users: User[] = [];
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
  idPage: number = 0;
  idUser: number = 0;

  constructor(
    private router: ActivatedRoute, // Agregué 'private' para inyección de dependencias
    private eventosService: EventoService, // Agregué 'private' para inyección de dependencias
    private loginService: LoginService,
    private route: Router
  ) {}
  
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const id = params['id'];
      this.idPage = id;
      if (id) {
        this.eventosService.getEventById(id).subscribe({
          next: (evento) => {
            this.evento = evento;
          },
          error: (err) => {
            console.error('Error fetching event:', err);
          }
        });
        this.eventosService.verUsuariosRegistrados(id).subscribe({
          next: (usuarios)=>{
            this.users = usuarios;
          }
        });
      } else {
        console.error('No event ID provided in the route');
      }
    });
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
      error: (err) => {
        console.error('Error fetching user login status:', err);
      }
    });
    this.loginService.currentUser.subscribe({
      next: (data)=>{
        this.idUser = data.id;
      }
    });
  }

  registrar(idPage: number, userId: number){
    this.eventosService.registrarUsuario(idPage, userId).subscribe({
      next: () => {
        console.log('Registrado a evento con éxito');
        this.route.navigateByUrl("inicio");
      },
      error: (err) => {
        console.error('Error al registrar usuario: ', err);
      }
    });
  }
  
}
