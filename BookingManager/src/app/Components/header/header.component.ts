import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Profile } from 'src/app/Models/UserProfile';
import { LoggedOutAction } from '../login/State/Login.Actions';
import { LoginAppState } from '../login/State/Login.Reducer';
import { GetLoginstatus } from '../login/State/Login.Selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Name:string;
  constructor(private router: Router, public store:Store<LoginAppState>) { }
  UserData:Profile
  profilepicture:string
  @Input()
  set userdata(val: Profile) {
    this.UserData=val;
  }
  get userdata(): Profile {
    return this.UserData;
  }
  faketitle="Do you to Logout?";
  ShowPopup=false;
  showChangePassword=false;
  
  ngOnInit() {
    //console.log("header"+ JSON.stringify(this.UserData));
    this.profilepicture=localStorage.getItem('picture');
    this.Name=localStorage.getItem('Name');
    // console.log(this.profilepicture)
    this.store.select(GetLoginstatus).subscribe(
      data => {
        if(data){
          this.showChangePassword=data;
        }
      }
    )
  }
  Logout(){
    localStorage.clear();
    this.store.dispatch(LoggedOutAction());
    this.router.navigateByUrl('Login');

  }
  home(){
    // console.log("try to go home");
    this.router.navigateByUrl('PostBooking');
  }
  PopupOutput(event){
    if(event){
      this.Logout();
      this.ShowPopup=false;
    }
    else{
      this.ShowPopup=false;
    }
  }
  openPopUp(){
    this.ShowPopup=true;
  }
  openChangePassword(){
    this.router.navigateByUrl('Password');
  }
}
