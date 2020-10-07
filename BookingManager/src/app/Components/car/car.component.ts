import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/Models/Car';
import { IndiviualStatus } from 'src/app/Models/status';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  tripid:string;
  cardetails:Car;
  confirm:boolean;
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
    var _confirm=IndiviualStatus[IndiviualStatus.Confirm];
    if(this.cardetails.status.toString() === _confirm.toString() )
    {
      this.confirm=true;
    }
  }

}
