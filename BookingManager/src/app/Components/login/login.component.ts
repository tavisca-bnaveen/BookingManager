import { Component, OnInit } from '@angular/core';
import { AuthenticateUsers } from 'src/app/Models/Users';
import { AuthencticationService } from 'src/app/Services/Auth0/authenctication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private users:AuthenticateUsers;
  constructor(private authenctication : AuthencticationService) {
    this.users=new AuthenticateUsers();
  }

  username:string;
  password:string;
  ngOnInit() {
    
    console.log("allusers"+JSON.stringify(this.users.GetAllUsers()));
    
    if(localStorage.getItem('TokenManager') == 'fool')
        localStorage.removeItem('TokenManager');
  }
  onlogin(){
    console.log(this.username);
    console.log(this.password);
    
  }
  onGooglelogin(){
    localStorage.setItem('TokenManager','fool');
    window.location.href= this.authenctication.GetAuth0Authorization();
    
  }
}
