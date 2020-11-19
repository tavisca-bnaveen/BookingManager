import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TripProfile } from 'src/app/Models/Profile';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileService{
    private _ApiUri: string;


    
    constructor(private http : HttpClient) {
        this._ApiUri= environment.ApiUri;
    }

    GetProfileById(Email:string){

        return this.http.get<TripProfile>(this._ApiUri+'/api/Profile/GetProfile?Id='+Email);
    }
    UpdateProfileById(profile:TripProfile){
        
        return this.http.post<boolean>(this._ApiUri+'/api/Profile/UpdateProfile',profile);
    }
    CreateProfile(profile:TripProfile){
        return this.http.post<boolean>(this._ApiUri+'/api/Profile/CreateProfile',profile);
    }
}
