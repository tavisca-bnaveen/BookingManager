import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators,AbstractControl} from '@angular/forms';
import { AuthenticateUsers } from 'src/app/Models/Users';
import { AuthencticationService } from 'src/app/Services/Auth0/authenctication.service';
import { LoginCustomValidator } from './login.customvalidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private users:AuthenticateUsers;
  formLogin:FormGroup;
  constructor(private authenctication : AuthencticationService) {
    this.users=new AuthenticateUsers();
    this.formLogin= new FormGroup({
      formEmail:new FormControl(this.username,
        Validators.compose([
          Validators.required,
          LoginCustomValidator.checkEmailRegex
        ])),
      formPassword: new FormControl(this.password,
          Validators.compose([
          Validators.required
        ]))
      }
    );
  }
 

  username:string;
  password:string;
  ngOnInit() {
    this.formLogin.setValue({'formEmail':"","formPassword":""});
    console.log("allusers"+JSON.stringify(this.users.GetAllUsers()));
    
    if(localStorage.getItem('TokenManager') == 'fool')
        localStorage.removeItem('TokenManager');
  }
  onlogin(){
    
    console.log(this.formLogin.controls.formEmail.value);
    console.log(this.formLogin.controls.formPassword.value);
    
  }
  onGooglelogin(){
    localStorage.setItem('TokenManager','fool');
    window.location.href= this.authenctication.GetAuth0Authorization();
    
  }
}
