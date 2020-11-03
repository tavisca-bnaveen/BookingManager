import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from 'src/app/Models/Trip';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripserviceService {
  private _ApiUri: string;

  constructor(private http:HttpClient) {
    this._ApiUri= environment.ApiUri;
   }

  GetAllTrips(id:string){
    let httpHeaders=null;
    httpHeaders = new HttpHeaders({
      
      'Content-Type':'application/json'
      
      
    });
    //const ucv_data: any = 'assets/TripsMockups.json';
    return this.http.get<Trip[]>(this._ApiUri+"/api/Booking/GetAllTrips",{headers: httpHeaders});
    
  }
  CancelFlight(TripId:string,PNR:string){
    return this.http.delete<boolean>(this._ApiUri+"/api/Booking/CancelFlight?TripId="+TripId+"&PNR="+PNR);
  }
  CancelHotel(TripId:string,Id:string){
    return this.http.delete<boolean>(this._ApiUri+"/api/Booking/CancelHotel?TripId="+TripId+"&Id="+Id);
  }
  CancelCar(TripId:string,Id:string){
    return this.http.delete<boolean>(this._ApiUri+"/api/Booking/CancelCar?TripId="+TripId+"&Id="+Id);
  }
  GetFlightStatus(TripId:string,PNR:string){
    //return this.http.get<string>("https://localhost:44389/api/Booking/GetFlightStatus?TripId=12345&PNR=QWERTY",{responseType:'text' as 'json'});
    return this.http.get<string>(this._ApiUri+"/api/Booking/GetFlightStatus?TripId="+TripId+"&PNR="+PNR,{responseType:'text' as 'json'});
  }
  GetHotelStatus(TripId:string,Id:string){
    return this.http.get<string>(this._ApiUri+"/api/Booking/GetHotelStatus?TripId="+TripId+"&Id="+Id,{responseType:'text' as 'json'});
  }
  GetCarStatus(TripId:string,Id:string){
    return this.http.get<string>(this._ApiUri+"/api/Booking/GetCarStatus?TripId="+TripId+"&Id="+Id,{responseType:'text' as 'json'});
  }
}
