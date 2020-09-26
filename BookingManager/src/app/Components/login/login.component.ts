import { Component, OnInit } from '@angular/core';
import { AuthencticationService } from 'src/app/Services/Auth0/authenctication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenctication : AuthencticationService) { }
  username:string;
  password:string;
  ngOnInit() {

  }
  onlogin(){
    console.log(this.username);
    console.log(this.password);
    
  }
  onGooglelogin(){
    window.location.href= this.authenctication.GetAuth0Authorization();
  }
}
