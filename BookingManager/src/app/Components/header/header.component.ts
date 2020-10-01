import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/Models/UserProfile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Name:string;
  constructor(private router: Router) { }
  UserData:Profile
  profilepicture:string
  @Input()
  set userdata(val: Profile) {
    this.UserData=val;
  }
  get userdata(): Profile {
    return this.UserData;
  }

  ngOnInit() {
    //console.log("header"+ JSON.stringify(this.UserData));
    this.profilepicture=localStorage.getItem('picture');
    this.Name=localStorage.getItem('Name');
    console.log(this.profilepicture)
  }
  Logout(){
    localStorage.clear();
    this.router.navigateByUrl('Login');
  }
  home(){
    console.log("try to go home");
    this.router.navigateByUrl('PostBooking');
  }
}
