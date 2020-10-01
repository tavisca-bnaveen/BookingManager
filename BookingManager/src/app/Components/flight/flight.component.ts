import { Component, Input, OnInit } from '@angular/core';
import { Flight } from 'src/app/Models/Flight';

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
  constructor() { }

  ngOnInit() {
  }

}
