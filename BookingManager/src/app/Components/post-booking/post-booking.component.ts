import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Profile } from 'src/app/Models/UserProfile';
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
  @Output()
  UserData= new EventEmitter<Profile>();
  
  constructor(private activatedRoute: ActivatedRoute,private router:Router,private auth0 : AuthencticationService) {
    
   }

  ngOnInit() {
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
        this.header=true
      },
      error =>{
        this.router.navigateByUrl('/login');
        this.header=true
      }
    )
    
  }

}
