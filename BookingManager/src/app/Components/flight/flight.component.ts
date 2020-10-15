import { Component, Input, OnInit } from '@angular/core';
import { Flight } from 'src/app/Models/Flight';
import { FlightStatus } from 'src/app/Models/FlightStatus';
import { TripserviceService } from 'src/app/Services/TripService/tripservice.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  tripid:string;
  flightdetails:Flight;
  @Input()
  set TripId(val: string) {
    this.tripid=val;
  }
  get TripId(): string {
    return this.tripid;
  }
  @Input()
  set Flightdetails(val: Flight) {
    this.flightdetails=val;
  }
  get Flightdetails(): Flight {
    return this.flightdetails;
  }
  constructor(private tripservice:TripserviceService) { }
  cancel:boolean
  ngOnInit() {
    this.cancel=false;
    var _cancel=FlightStatus[FlightStatus.Cancel];
    if(this.flightdetails.status.toString().toLowerCase() === _cancel.toString().toLowerCase() )
    {
      this.cancel=true;
      
    }
  }
  CancelFlight(){
    this.tripservice.CancelFlight(this.TripId,this.flightdetails.pnr).subscribe(
      data =>{
          this.flightdetails.status=FlightStatus[FlightStatus.Cancel] ;
          this.cancel=true;
          window.location.reload();

      }
    )
  }
}
