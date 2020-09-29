import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from 'src/app/Models/Trip';

@Injectable({
  providedIn: 'root'
})
export class TripserviceService {

  constructor(private http:HttpClient) { }

  GetAllTrips(id:string){
    const ucv_data: any = 'assets/TripsMockups.json';
    return this.http.get<Trip[]>(ucv_data);
    
  }
}
