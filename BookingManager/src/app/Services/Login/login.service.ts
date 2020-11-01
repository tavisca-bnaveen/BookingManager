import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from 'src/app/Models/LoginDetails';
import { Profile } from 'src/app/Models/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  GetAuthentication(email:string,password:string){

    var details= new LoginDetails();
    details.Email=email;
    details.Password=password;
    return this.http.post<boolean>('https://localhost:44389/api/Login',details);
  }
  GetAllUsers(){
    let allUsers=new Array<Profile>();
    
    
    return  this.http.get<Profile[]>('https://localhost:44389/api/Login/AllUsers');
    
  }
  ChangePassword(login:LoginDetails,newPassword:String){
    
    let newObject={
      "Login":login,
      "NewPassword":newPassword
    }
    return this.http.put<string>('https://localhost:44389/api/Login/ChangePassword',newObject,{responseType:'text' as 'json'})
  }
}
