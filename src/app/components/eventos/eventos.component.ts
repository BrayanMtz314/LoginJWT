import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento';
import { EventoService } from '../../services/evento/evento.service';
import { Route, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit{
  eventos: Evento[] = [];
  userLoginOn: Boolean = false;

  constructor(private eventoService: EventoService, private loginService: LoginService, private route: Router){

  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn)=>{
        this.userLoginOn = userLoginOn;
      }
    });
    this.eventoService.eventos.subscribe({
      next: (eventos)=>{
        this.eventos = eventos;
      }
    });
  }
  
  filtrar(){

  }

  borrarEvento(id: number): void {
    this.eventoService.deleteEvent(id).subscribe({
      next: () => {
        console.log(`Evento con id ${id} eliminado.`);
        window.location.reload();
      },
      error: err => {
        console.error('Error eliminando el evento:', err);
      }
    });
  }



}
