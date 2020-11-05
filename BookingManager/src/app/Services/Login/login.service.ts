import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from 'src/app/Models/LoginDetails';
import { Profile } from 'src/app/Models/UserProfile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _ApiUri:string
  constructor(private http : HttpClient) {
    this._ApiUri= environment.ApiUri;
   }

  GetAuthentication(email:string,password:string){

    var details= new LoginDetails();
    details.Email=email;
    details.Password=password;
    return this.http.post<boolean>(this._ApiUri+'/api/Login',details);
  }
  GetAllUsers(){
    let allUsers=new Array<Profile>();
    
    
    return  this.http.get<Profile[]>(this._ApiUri+'/api/Login/AllUsers');
    
  }
  ChangePassword(login:LoginDetails,newPassword:String){
    
    let newObject={
      "Login":login,
      "NewPassword":newPassword
    }
    return this.http.put<string>(this._ApiUri+'/api/Login/ChangePassword',newObject,{responseType:'text' as 'json'})
  }
}
