import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/Models/UserProfile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
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
    this.profilepicture=this.UserData.picture
    console.log(this.profilepicture)
  }

}
