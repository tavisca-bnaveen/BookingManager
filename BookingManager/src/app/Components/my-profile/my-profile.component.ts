import { Component, OnInit } from '@angular/core';
import { Gender } from 'src/app/Models/Gender';
import { TripProfile } from 'src/app/Models/Profile';
import { ProfileService } from 'src/app/Services/Profile/Profile.Service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(public profileService:ProfileService) { }
  _profile:TripProfile;
  dataArrived=false;
  _hobbies:string;
  _Age:number;
  _Name:string;
  Edit:boolean;
  Error:boolean;
  ErrorText:string;
  Male:boolean;
  success=false;
  
  ngOnInit() {
    this._profile=new TripProfile();
    this.Male=false;
    this.Edit=false;
    this.Error=false;
    this._hobbies=""
    
    
    this.profileService.GetProfileById(localStorage.getItem('TokenManager')).subscribe(
      data => {

        this.dataArrived=true;
        this._profile=data;
        this._hobbies=this._profile.hobbies;
        this._Age=Number(this._profile.age);
        this._Name=this._profile.name;
        localStorage.setItem('Name',this._Name);
        
        if(this._profile.gender==Gender.male){
          this.Male=true;
        }
        else{
          this.Male=false
        }
      },
      error =>{
        this._profile.email=localStorage.getItem('TokenManager');
        this._profile.name=localStorage.getItem('Name');
        if(localStorage.getItem('gender')=="female"){
          this._profile.gender=Gender.female
        }
        else{
          this._profile.gender=Gender.male
        }
        this._profile.age=0;
        this._profile.hobbies=""
        var DateObj= new Date();
        this._profile.joined= ('0' + DateObj.getDate()).slice(-2) + '-' + ('0' + (DateObj.getMonth() + 1)).slice(-2) + '-' + DateObj.getFullYear();
        this.profileService.CreateProfile(this._profile).subscribe(
          data => {
            if(data){
              this.dataArrived=true;
              this._hobbies=this._profile.hobbies;
              this._Age=Number(this._profile.age);
              this._Name=this._profile.name;
              localStorage.setItem('Name',this._Name);
              
              if(this._profile.gender==Gender.male){
                this.Male=true;
              }
            }
            else{
              
            }
           
          }

        )
      }

    )
  }
  updateProfile(){
   
    if(isNaN(this._Age)){
      this.Error=true;
      this.ErrorText="Age must be number";
      return;
    }
    if(this._hobbies.length>0 && this._Age.toString().length>0 && this._Name.length>0)
    {
      this._profile.hobbies=this._hobbies;
      this._profile.age=this._Age;
      this._profile.name=this._Name;
      
      this.profileService.UpdateProfileById(this._profile).subscribe(
        data =>{
          if(data){
            this.success=true;
            this.ngOnInit();
          }
          else{
            this.Error=true;
            this.ErrorText="Something went wrong";
          }
        },
        error =>{
          this.Error=true;
            this.ErrorText="Check all details";
        }
      )
    }
    else{
      this.Error=true;
      this.ErrorText="Fill All Details";
    }
  }
  EditProfile(){
    
    this.Edit=true;
    this.success=false;
  }

}
