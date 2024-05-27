import { Injectable } from '@angular/core';
import { Evento } from '../../interfaces/evento';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { NewEventRequest } from '../../interfaces/new-event-request';

@Injectable({
  providedIn: 'root',
})
export class EventoService{
  eventosIniciales: Evento[] = [
    {
      id: 0,
      nombre: '',
      descripcion:'',
      fecha: '',
      hora: '',
      categoria: '',
      ubicacion: '',
    }
  ];

  eventos: BehaviorSubject<Evento[]> = new BehaviorSubject<Evento[]>(this.eventosIniciales);
  

  constructor(private http: HttpClient) {
    this.getAllEvents().subscribe({
      next:(eventos: Evento[])=>{
        this.eventos.next(eventos);
      }
    });
  }

  getAllEvents():Observable<Evento[]>{
    return this.http.get<Evento[]>(environments.urlApi+"evento/eventos").pipe(
      catchError(this.handleError)
    )
  }

  getEventById(id: number):Observable<Evento>{
    return this.http.get<Evento>(environments.urlApi+"evento/"+id).pipe(
      catchError(this.handleError)
    );
  }

  SaveEvent(newEventRequest: NewEventRequest): Observable<any>{
    return this.http.post<any>(environments.urlApi + "evento/save", newEventRequest).pipe(
      catchError(this.handleError)
    );
  }

  deleteEvent(id: number):Observable<any>{
    return this.http.get<any>(environments.urlApi + "evento/delete/" + id).pipe(
      catchError(this.handleError)
    );
  }


  
  
  private handleError(error:HttpErrorResponse){
    if(error.status === 0 ){
      console.error("Se ha producido un error", error.error);
    }else{
      console.error("Backend retorno el cofigo del estado", error.status, error.error);
    }
    return throwError(()=>
      new Error("algo fallo Por favor intente nueva mente")
    );
  }

}
