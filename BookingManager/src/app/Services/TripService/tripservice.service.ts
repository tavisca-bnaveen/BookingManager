import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from 'src/app/Models/Trip';

@Injectable({
  providedIn: 'root'
})
export class TripserviceService {

  constructor(private http:HttpClient) { }

  GetAllTrips(id:string){
    let httpHeaders=null;
    httpHeaders = new HttpHeaders({
      
      'Content-Type':'application/json'
      
      
    });
    //const ucv_data: any = 'assets/TripsMockups.json';
    return this.http.get<Trip[]>("https://localhost:44389/api/Booking/GetAllTrips",{headers: httpHeaders});
    
  }
  CancelFlight(TripId:string,PNR:string){
    return this.http.delete<boolean>("https://localhost:44389/api/Booking/CancelFlight?TripId="+TripId+"&PNR="+PNR);
  }
  CancelHotel(TripId:string,Id:string){
    return this.http.delete<boolean>("https://localhost:44389/api/Booking/CancelHotel?TripId="+TripId+"&Id="+Id);
  }
  CancelCar(TripId:string,Id:string){
    return this.http.delete<boolean>("https://localhost:44389/api/Booking/CancelCar?TripId="+TripId+"&Id="+Id);
  }
}
