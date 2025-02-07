import { Component, OnInit } from '@angular/core';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { environments } from '../../../environments/environments';
import { nextTick } from 'process';
import { BlobOptions } from 'buffer';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent implements OnInit {
  errorMessage: String = "";
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;


  registerForm = this.formBuilder.group({
    id:[''],
    lastname:['', Validators.required],
    firstname:['',Validators.required],
    country:['',Validators.required]
  })

  constructor(private userService: UserService, private formBuilder: FormBuilder, private loginService: LoginService){
    this.userService.getUser(environments.userId).subscribe({
      next: (userData) => {
        this.user = userData;
        this.registerForm.controls.id.setValue(userData.id.toString());
        this.registerForm.controls.firstname.setValue( userData.firstname);
        this.registerForm.controls.lastname.setValue( userData.lastname);
        this.registerForm.controls.country.setValue( userData.country);
      },
      error: (errorData)=>{
        this.errorMessage = errorData
      },
      complete: ()=>{
        console.log("User Data OK") 
      }
    })

  this.loginService.userLoginOn.subscribe({
    next:(userLoginOn)=>{
      this.userLoginOn = userLoginOn;
    }
  })

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get firstname(){
    return this.registerForm.controls.firstname;
  }

  get lastname(){
    return this.registerForm.controls.lastname;
  }

  get country(){
    return this.registerForm.controls.country;
  }

  savePersonaDetailsData(){
    if(this.registerForm.valid){
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next: ()=>{
          this.editMode = false;
          this.user = this.registerForm.value as unknown as User;
        },
        error: (errorData)=>{
          console.error(errorData);
        }
      })
    }
  }
  

}
