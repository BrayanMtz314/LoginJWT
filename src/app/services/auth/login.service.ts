import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { LoginRequest } from '../../interfaces/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { User } from '../../interfaces/user';
import { environments } from '../../../environments/environments';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  EMPTY_USER: User = {
    id: 0,
    username: '',
    lastname: '',
    firstname: '',
    country: ''
  };

   currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   currentUserData : BehaviorSubject<String> = new BehaviorSubject<String>("");
   currentUser : BehaviorSubject<User> = new BehaviorSubject<User>(this.EMPTY_USER); 

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object, private userService: UserService) {
    if(isPlatformBrowser(this.platformId)){
      this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null)
      this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    }
   }

  login(credentials: LoginRequest): Observable<any>{
    this.userService.getUserByUsername(credentials.username).subscribe({
      next: (user: User) => {
        sessionStorage.setItem("log", user.username);
        this.currentUser.next(user);
        console.log(this.currentUser);
      },
      error: (error) => {
        console.error('Error encontrando al usuario: ', error);
      }
    });
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
