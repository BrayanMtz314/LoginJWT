import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environments } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: number):Observable<User>{
    return this.http.get<User>(environments.urlApi+"user/id/"+id).pipe(
      catchError(this.handleError)
    )
  }

  getUserByUsername(username: String):Observable<User>{
    return this.http.get<User>(environments.urlApi+"user/username/"+username).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(userRequest:User):Observable<any>{
    return this.http.put(environments.urlApi+"user",userRequest).pipe(
      catchError(this.handleError)
    )
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
