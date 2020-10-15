import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/Models/Car';
import { IndiviualStatus } from 'src/app/Models/status';
import { TripserviceService } from 'src/app/Services/TripService/tripservice.service';

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

  constructor(private tripservice:TripserviceService) { }

  ngOnInit() {
    var _confirm=IndiviualStatus[IndiviualStatus.Confirm];
    if(this.cardetails.status.toString() === _confirm.toString() )
    {
      this.confirm=true;
    }
  }
  CancelCar(){
    this.tripservice.CancelCar(this.tripid,this.cardetails.id).subscribe(
      data => {
        this.confirm=false;
        this.cardetails.status= IndiviualStatus[IndiviualStatus.Cancel];
        window.location.reload();
      }
    )
  }

}
