import { Component, OnInit } from '@angular/core';
import { LoginDetails } from 'src/app/Models/LoginDetails';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private loginService:LoginService) { }
  CurrentEmail:string;
  CurrentPassword:string;
  NewPassword:string;
  RePassword:string;
  ShowError:boolean;
  ErrorText="";
  ngOnInit() {
    this.ShowError=false;
    this.Reset()
  }

  OnChangePassword(){
    if(this.NewPassword.length>0 && this.CurrentPassword.length>0 && this.RePassword.length>0){
      if(this.NewPassword==this.RePassword){
        var details =new LoginDetails();
        details.Email=localStorage.getItem('TokenManager');
        details.Password=this.CurrentPassword;
        this.loginService.ChangePassword(details,this.NewPassword).subscribe(
          data =>{
            this.ShowError=true;
            this.ErrorText=data
          }
        )
      }
      else{
        this.ShowError=true;
            this.ErrorText="password doesn't match";

      }
    }
    else{
      this.ShowError=true;
      this.ErrorText="Fill all Details";
    }
  }
  Reset(){
    
    
    this.CurrentEmail="";
    this.CurrentPassword="";
    this.NewPassword="";
  }
}
