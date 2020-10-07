import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from 'src/app/Models/LoginDetails';

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
}
