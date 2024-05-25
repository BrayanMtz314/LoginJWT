import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento';
import { EventoService } from '../../services/evento/evento.service';
import { RouterLink } from '@angular/router';
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

  constructor(private eventoService: EventoService, private loginService: LoginService){
    eventoService.eventos.subscribe({
      next: (eventos)=>{
        this.eventos = eventos;
      }
    });
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn)=>{
        this.userLoginOn = userLoginOn;
      }
    });
  }
  
  filtrar(){

  }


}
