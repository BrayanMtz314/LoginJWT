import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from './user';
import { environments } from '../../../environments/environments';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   currentUserData : BehaviorSubject<String> = new BehaviorSubject<String>("");


  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
    if(isPlatformBrowser(this.platformId)){
      this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null)
      this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    }
   }

  login(credentials: LoginRequest): Observable<any>{
    return this.http.post<any>(environments.urlHost+"auth/login", credentials).pipe(
      tap( (userData) =>{
        if(isPlatformBrowser(this.platformId)){
          sessionStorage.setItem("token", userData.token);
        }
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 0 ){
      console.error("Se ha producido un error", error.error);
    }else{
      console.error("Backend retorno el cofigo del estado", error);
    }
    return throwError(()=>
      new Error("algo fallo Por favor intente nueva mente")
    );
  }

  logout(){
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem("token");
    }
    this.currentUserLoginOn.next(false);
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }


}
