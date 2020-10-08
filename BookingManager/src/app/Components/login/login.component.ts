import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthenticateUsers } from 'src/app/Models/Users';
import { AuthencticationService } from 'src/app/Services/Auth0/authenctication.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { LoginCustomValidator } from './login.customvalidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private users:AuthenticateUsers;
  formLogin:FormGroup;
  constructor(private authenctication : AuthencticationService , private loginService:LoginService,private router: Router) {
    this.users=new AuthenticateUsers(loginService);
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
 
  LoginError:boolean;
  username:string;
  password:string;
  ngOnInit() {
    this.formLogin.setValue({'formEmail':"","formPassword":""});
    console.log("allusers"+JSON.stringify( this.users.GetAllUsers()));
    this.LoginError=false;
    if(localStorage.getItem('TokenManager') == 'fool')
        localStorage.removeItem('TokenManager');
  }
  onlogin(){
    
    // console.log(this.formLogin.controls.formEmail.value);
    // console.log(this.formLogin.controls.formPassword.value);
    this.username=this.formLogin.controls.formEmail.value.toString();
    this.loginService.GetAuthentication(this.formLogin.controls.formEmail.value,this.formLogin.controls.formPassword.value)
    .subscribe(data => {
      console.log(data);
      if(data){
        localStorage.setItem('TokenManager',this.formLogin.controls.formEmail.value);
        localStorage.setItem('Name',this.username.substr(0,this.username.indexOf('@')));
        localStorage.setItem('picture','https://www.iconfinder.com/data/icons/mix-color-4/502/Untitled-1-512.png')
        this.router.navigateByUrl('PostBooking');
      }
      else{
        this.LoginError=true;
      }
    })
    
  }
  onGooglelogin(){
    localStorage.setItem('TokenManager','fool');
    window.location.href= this.authenctication.GetAuth0Authorization();
    
  }
}
