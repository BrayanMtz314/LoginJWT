import { Injectable } from '@angular/core';
import { Evento } from '../../interfaces/evento';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  eventosIniciales: Evento[] = [
    {
      id: 1,
      nombre: 'Astrofisica Magica',
      descripcion:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.' +
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.',
      fecha: '18/12/2024',
      hora: '04:00 PM',
      categoria: 'Recreacion',
      ubicacion: 'Pozo de FCFM',
    },
    {
      id: 2,
      nombre: 'Reunion de Consejo de quimica',
      descripcion:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.' +
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.',
      fecha: '20/11/2024',
      hora: '05:00 PM',
      categoria: 'Academica',
      ubicacion: 'Foro principal',
    },
    {
      id: 2,
      nombre: 'Reunion de Consejo de quimica',
      descripcion:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.' +
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.',
      fecha: '20/11/2024',
      hora: '05:00 PM',
      categoria: 'Academica',
      ubicacion: 'Foro principal',
    },
    {
      id: 2,
      nombre: 'Reunion de Consejo de quimica',
      descripcion:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.' +
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.',
      fecha: '20/11/2024',
      hora: '05:00 PM',
      categoria: 'Academica',
      ubicacion: 'Foro principal',
    },
    {
      id: 2,
      nombre: 'Reunion de Consejo de quimica',
      descripcion:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.' +
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.',
      fecha: '20/11/2024',
      hora: '05:00 PM',
      categoria: 'Academica',
      ubicacion: 'Foro principal',
    },
    {
      id: 2,
      nombre: 'Reunion de Consejo de quimica',
      descripcion:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.' +
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.',
      fecha: '20/11/2024',
      hora: '05:00 PM',
      categoria: 'Academica',
      ubicacion: 'Foro principal',
    },
    {
      id: 2,
      nombre: 'Papeleo Swimming',
      descripcion:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.' +
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, optio suscipit. Rerum pariatur iure, ea sequi, explicabo soluta quas dolor distinctio minima error officiis. Officia harum tempora laudantium obcaecati doloremque.',
      fecha: '20/11/2024',
      hora: '05:00 PM',
      categoria: 'Academica',
      ubicacion: 'Alberca Fod',
    },
  ];

  eventos: BehaviorSubject<Evento[]> = new BehaviorSubject<Evento[]>(this.eventosIniciales);
  

  constructor() {}
}
