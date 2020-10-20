import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from 'src/app/Models/UserProfile';
import { AuthConfig } from 'src/environments/environment';
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
    

    return this.http.get<Profile>('https://'+AuthConfig.DomainId+AuthConfig.Api.profile,{headers:headers});
    //https:domain/userinfo
  }
  GetAuth0Authorization(){
    var Auth0GmailUrl= "https://"+AuthConfig.DomainId+AuthConfig.Api.login+"?response_type="+AuthConfig.Response_Type.token+"&client_id="+AuthConfig.ClientId+"&connection="+AuthConfig.connection.gmail+"&redirect_uri="+AuthConfig.redirect_uri.success+"&scope="+AuthConfig.scope;
    
    return Auth0GmailUrl;
  }
  
  // https:// domainid/authorize?response_type=token&cliend_id=&connection=google-oauth2&redirect_uri=&scope=openid%20profile%20email

}
