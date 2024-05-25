import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';
import { nextTick } from 'process';

@Component({
  selector: 'app-personas-registradas',
  standalone: true,
  imports: [],
  templateUrl: './personas-registradas.component.html',
  styleUrl: './personas-registradas.component.css'
})
export class PersonasRegistradasComponent implements OnInit{

  users: User[] = [];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getAllusers().subscribe({
      next: (users)=>{
          this.users = users;
      }
    });
  }
  

  

}
