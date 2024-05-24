import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { LoginService } from '../../services/auth/login.service';
import { nextTick } from 'process';
import { User } from '../../services/auth/user';
import { PersonalDetailsComponent } from '../../components/personal-details/personal-details.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent, PersonalDetailsComponent],
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
