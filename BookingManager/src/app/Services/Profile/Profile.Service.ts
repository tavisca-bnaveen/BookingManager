import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TripProfile } from 'src/app/Models/Profile';

@Injectable({
    providedIn: 'root'
})
export class ProfileService{


    
    constructor(private http : HttpClient) {
        
    }

    GetProfileById(Email:string){

        return this.http.get<TripProfile>('https://localhost:44389/api/Profile/GetProfile?Id='+Email);
    }
    UpdateProfileById(profile:TripProfile){
        
        return this.http.post<boolean>('https://localhost:44389/api/Profile/UpdateProfile',profile);
    }
}
