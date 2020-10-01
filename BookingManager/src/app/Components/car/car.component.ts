import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/Models/Car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  tripid:string;
  cardetails:Car;
  @Input()
  set TripId(val: string) {
    this.tripid=val;
  }
  get TripId(): string {
    return this.tripid;
  }
  @Input()
  set Cardetails(val: Car) {
    this.cardetails=val;
    
  }
  get Cardetails(): Car {
    return this.cardetails;
  }

  constructor() { }

  ngOnInit() {
  }

}
