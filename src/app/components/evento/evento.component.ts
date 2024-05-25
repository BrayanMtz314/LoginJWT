import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventoService } from '../../services/evento/evento.service';
import { Evento } from '../../interfaces/evento';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [PersonalDetailsComponent],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent implements OnInit{
  userLoginOn: Boolean = false;

  evento: Evento = {
    id: 2,
    nombre: 'Reunion de Consejo de quimica',
    descripcion:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.' +
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.',
    fecha: '20/11/2024',
    hora: '05:00 PM',
    categoria: 'Academica',
    ubicacion: 'Foro principal',
  }
  constructor(router: ActivatedRoute, eventosService: EventoService, private loginService: LoginService){

  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn)=>{
        this.userLoginOn = userLoginOn;
      }
    });
  }


  
}
