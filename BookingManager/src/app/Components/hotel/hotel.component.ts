import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from 'src/app/Models/Hotel';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {


  
  tripid:string;
  hoteldetails:Hotel;
  @Input()
  set TripId(val: string) {
    this.tripid=val;
  }
  get TripId(): string {
    return this.tripid;
  }
  @Input()
  set Hoteldetails(val: Hotel) {
    this.hoteldetails=val;
  }
  get Hoteldetails(): Hotel {
    return this.hoteldetails;
  }

  constructor() { }

  ngOnInit() {
  }

}
