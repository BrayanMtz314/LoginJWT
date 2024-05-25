import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { LoginService } from '../../services/auth/login.service';
import { nextTick } from 'process';
import { User } from '../../interfaces/user';
import { PersonalDetailsComponent } from '../../components/personal-details/personal-details.component';
import { EventosComponent } from '../../components/eventos/eventos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent, PersonalDetailsComponent, EventosComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  userLoginOn:  boolean = false;
  userData?: User;

  constructor( private loginService : LoginService){}



  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn)=>{
        this.userLoginOn = userLoginOn;
      }
    });


  }


}
