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
  carStatus:string;
  _Confirm="Confirm";
  ShowPopup=false;
  faketitle="Do you want to cancel this car?";
  ngOnInit() {
    var _confirm=this._Confirm;
    if(this.cardetails.status.toString() === _confirm.toString() )
    {
      this.confirm=true;
    }
    this.carStatus=this.cardetails.status.toString();
  }
  CancelCar(){
    this.tripservice.CancelCar(this.tripid,this.cardetails.id).subscribe(
      data => {
        this.confirm=false;
        this.carStatus= IndiviualStatus[IndiviualStatus.Cancel];
        window.location.reload();
      }
    )
  }
  getCarStatus(){
    this.tripservice.GetCarStatus(this.tripid,this.cardetails.id).subscribe(
      data => {
        
          this.carStatus=data;
          window.location.reload();
        
      
      }
    )
  }
  PopupOutput(event){
    if(event){
      this.CancelCar();
      this.ShowPopup=false;
    }
    else{
      this.ShowPopup=false;
    }
  }
  openPopUp(){
    this.ShowPopup=true;
  }
}
