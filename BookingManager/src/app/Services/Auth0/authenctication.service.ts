import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from 'src/app/Models/UserProfile';
@Injectable({
  providedIn: 'root'
})
export class AuthencticationService {

  constructor(private http:HttpClient) { }

  GetUserInfo(access_token:string,token_type:string){
    let headers=null;
    headers = new HttpHeaders({
      'Authorization': token_type+' '+ access_token,
      'Content-Type':'application/json'
      
      
    });
    console.log(token_type+' '+ access_token);
    

    return this.http.get<Profile>('https://dev-v-ngyyfa.us.auth0.com/userinfo',{headers:headers});
  }
  GetAuth0Authorization(){
    return "https://dev-v-ngyyfa.us.auth0.com/authorize?response_type=token&client_id=N7XVAjoPzdW9SKrb4kU3aj6bvUDIssp3&connection=google-oauth2&redirect_uri=http://localhost:4200/PostBooking&scope=openid%20profile%20email";
  }


}
