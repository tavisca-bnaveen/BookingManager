import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Profile } from 'src/app/Models/UserProfile';
import { AuthenticateUsers } from 'src/app/Models/Users';
import { AuthencticationService } from 'src/app/Services/Auth0/authenctication.service';
@Component({
  selector: 'app-post-booking',
  templateUrl: './post-booking.component.html',
  styleUrls: ['./post-booking.component.css']
})
export class PostBookingComponent implements OnInit {

  params=null;
  ParamsValues=new Map<string,string>();
  CurrentUser=new Profile();
  header=false
  AllUsers : AuthenticateUsers;
  @Output()
  UserData= new EventEmitter<Profile>();
  
  constructor(private activatedRoute: ActivatedRoute,private router:Router,private auth0 : AuthencticationService) {
    this.AllUsers = new AuthenticateUsers();
   }

  ngOnInit() {
    if(this.activatedRoute.snapshot.fragment){
      this.params=this.activatedRoute.snapshot.fragment.split('&')
      this.params.forEach(element => {
      let dummyvalues=element.split('=');
      this.ParamsValues.set(dummyvalues[0],dummyvalues[1]);
      
    });
    this.auth0.GetUserInfo(this.ParamsValues.get('access_token'),this.ParamsValues.get('token_type')).subscribe(
      data => {
        this.CurrentUser=data;
        this.UserData.emit(this.CurrentUser);
        console.log("api"+ JSON.stringify(this.CurrentUser));
        localStorage.setItem('TokenManager',this.CurrentUser.email);
        this.header=true
        this.AllUsers.AddUser(this.CurrentUser);
        console.log("users"+JSON.stringify(this.AllUsers.GetAllUsers()));
      },
      error =>{
        this.header=true
        if(!localStorage.getItem('TokenManager') && localStorage.getItem('TokenManager').toLowerCase() !='fool'){
          this.router.navigateByUrl('Login');
        }
      }
    )
    }
    else{
      this.header=true
      if(!localStorage.getItem('TokenManager') && localStorage.getItem('TokenManager').toLowerCase() !='fool'){
        this.router.navigateByUrl('Login');
      }
    }

    
    
  }

}
