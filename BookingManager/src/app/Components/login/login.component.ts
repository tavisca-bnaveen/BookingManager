import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { async } from 'rxjs/internal/scheduler/async';
import { LoginDetails } from 'src/app/Models/LoginDetails';
import { AuthenticateUsers } from 'src/app/Models/Users';
import { AuthencticationService } from 'src/app/Services/Auth0/authenctication.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { LoginCustomValidator } from './login.customvalidator';
import { LoginAction, RememberAction, SendLoginRequest } from './State/Login.Actions';
import { LoginAppState } from './State/Login.Reducer';
import { GetLoginState, GetLoginstatus, GetRemembervalue } from './State/Login.Selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private users:AuthenticateUsers;
  formLogin:FormGroup;
  constructor(private authenctication : AuthencticationService , public loginService:LoginService,private router: Router,private spinner:NgxSpinnerService,public store:Store<LoginAppState>) {
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
  Remember:boolean;
  StateEmail:string;
  StatePassword:string;
  Checked:boolean;
  ngOnInit() {
    this.Checked=false;
    this.spinner.show();
    this.formLogin.setValue({'formEmail':"","formPassword":""});
    this.store.select(GetLoginState).subscribe(
      values => {
        if (values) {
          if(values.Remember)
            this.formLogin.setValue({'formEmail':values.Email,"formPassword":values.Password})
        }
      });
      this.store.select(GetRemembervalue).subscribe(
        value => this.Checked=value
      )
    this.LoginError=false;
    if(localStorage.getItem('TokenManager') == 'fool')
        localStorage.removeItem('TokenManager');
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  onlogin(){
    var _details= new LoginDetails();
    _details.Email=this.formLogin.controls.formEmail.value;
    _details.Password=this.formLogin.controls.formPassword.value;
    
    //store.dispatch   
    this.store.dispatch(RememberAction({remember:this.Checked}));
    let _remember=false;
    this.store.select(GetRemembervalue).subscribe(
      value => _remember=value
    )
    if(_remember){
      this.store.dispatch(LoginAction({details:_details}));
    }
    else{
      var emptyDetails= new LoginDetails();
      this.store.dispatch(LoginAction({details:emptyDetails}));
    }

    this.store.dispatch(SendLoginRequest({details:_details}));
    this.username=this.formLogin.controls.formEmail.value.toString();
    this.store.select(GetLoginstatus).subscribe(
      data => {
          
          if(data){
            localStorage.setItem('IsLoginThroughApi',"true");
            localStorage.setItem('TokenManager',this.formLogin.controls.formEmail.value);
            localStorage.setItem('Name',this.username.substr(0,this.username.indexOf('@')));
            localStorage.setItem('picture','https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png')
            this.router.navigateByUrl('PostBooking');
          }
          else{
            this.LoginError=true;
          }
        }
    )
    
  }
  onGooglelogin(){
    localStorage.setItem('TokenManager','fool');
    window.location.href= this.authenctication.GetAuth0Authorization();
    
  }
  RememberValues(){
    this.Checked=!this.Checked;
    

  }
}
