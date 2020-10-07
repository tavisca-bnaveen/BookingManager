import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Trip } from 'src/app/Models/Trip';
import { Profile } from 'src/app/Models/UserProfile';
import { AuthenticateUsers } from 'src/app/Models/Users';
import { AuthencticationService } from 'src/app/Services/Auth0/authenctication.service';
import { TripserviceService } from 'src/app/Services/TripService/tripservice.service';
// import {ViewColorDirective} from '../../CustomDirectives/View.Directive.Color';
@Component({
  selector: 'app-post-booking',
  templateUrl: './post-booking.component.html',
  styleUrls: ['./post-booking.component.css']
})
export class PostBookingComponent implements OnInit {

  params=null;
  ParamsValues=new Map<string,string>();
  CurrentUser=new Profile();
  AllTrips:Array<Trip>;
  header=false
  AllUsers : AuthenticateUsers;
  showtrips=false;
  TripId:string;
  ShowDetails=false;
  @Output()
  UserData= new EventEmitter<Profile>();
  CurrentTrip:Trip;
  constructor(private activatedRoute: ActivatedRoute,private router:Router,private auth0 : AuthencticationService,private tripservice:TripserviceService) {
    this.AllUsers = new AuthenticateUsers();
   }

  ngOnInit() {
    this.AllTrips=new Array<Trip>();
    this.ShowDetails=false
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
        localStorage.setItem('TokenManager',this.CurrentUser.email);
        localStorage.setItem('Name',this.CurrentUser.name);
        localStorage.setItem('picture',this.CurrentUser.picture);
        this.header=true
        this.AllUsers.AddUser(this.CurrentUser);
      },
      error =>{
        this.header=true
        
        //if(!localStorage.getItem('TokenManager') && localStorage.getItem('TokenManager').toLowerCase() !='fool'){
          localStorage.removeItem('TokenManager');
          this.router.navigateByUrl('Login');
        //}
      }
    )
    }
    else{
      this.header=true
      
      if(!localStorage.getItem('TokenManager') && localStorage.getItem('TokenManager').toLowerCase() !='fool'){
        this.router.navigateByUrl('Login');
      }
    }
    this.tripservice.GetAllTrips(localStorage.getItem('TokenManager')).subscribe(
      data=>{
        this.AllTrips=data;
        // console.log("ALL"+ JSON.stringify(this.AllTrips));
        // console.log("Hotel"+ JSON.stringify(this.AllTrips[0].Hotel));
        this.showtrips=true
      }
    );
    

  }
  GetMyTrips(){
    this.tripservice.GetAllTrips(localStorage.getItem('TokenManager')).subscribe(
      data=>{
        this.AllTrips=data;
        
      }
    );
    
  }
  ViewItinerayDetails(trip:Trip){
    this.TripId=trip.Id;
    this.CurrentTrip=trip;
    localStorage.setItem('TripId',trip.Id);
    this.router.navigateByUrl('Itineray');
  }

}
