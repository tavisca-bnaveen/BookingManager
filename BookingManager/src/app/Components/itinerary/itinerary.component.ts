import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { Trip } from 'src/app/Models/Trip';
import { TripserviceService } from 'src/app/Services/TripService/tripservice.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent implements OnInit {

  constructor(private tripService:TripserviceService,private spinner:NgxSpinnerService) {
    
    
   }
  trip:Trip;
  NoTrip:boolean
  TripId:string;
  ngOnInit() {
    this.spinner.show();
    
    this.NoTrip=true;
    this.TripId=localStorage.getItem('TripId');
    this.tripService.GetAllTrips(localStorage.getItem('TokenManager')).subscribe(
      data=>{
        data.forEach(_trip =>
          {
            if(_trip.id== localStorage.getItem('TripId'))
              {
                this.trip=_trip;
                this.NoTrip=false;
                setTimeout(() => {
                  this.spinner.hide();
                }, 1000);
                return;
              }
          });
      },
      error =>{
        this.NoTrip=true
      }
    )
  }

}
