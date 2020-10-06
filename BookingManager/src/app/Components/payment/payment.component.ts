import { Component, Input, OnInit } from '@angular/core';
import { FlightStatus } from 'src/app/Models/FlightStatus';
import { IndiviualStatus } from 'src/app/Models/status';
import { Trip } from 'src/app/Models/Trip';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  Trip:Trip;
  TotalAmount:string;
  TotalRefund:string;
  CancelComponent:boolean;
  @Input()
  set trip(val: Trip) {
    this.Trip=val;
  }
  get trip(): Trip {
    return this.Trip;
  }
  
  constructor() { }

  ngOnInit() {
    this.CancelComponent=false;
    this.calculateTotalAmount();

  }
  calculateTotalAmount(){
    let amount=0;
    let refund=0;
    if(this.Trip.Flight){
      amount+=(Number(this.Trip.Flight.cost)-Number(this.Trip.Flight.discount));
      if(this.Trip.Flight.Status.toString()=== FlightStatus[FlightStatus.Cancel]){
      
        
        this.CancelComponent=true;
        refund+=(Number(this.Trip.Flight.cost)-Number(this.Trip.Flight.discount));
      }
    }
    this.Trip.Hotel.forEach( hotel =>{
      amount+=(Number(hotel.cost)-Number(hotel.discount));
      if(hotel.status.toString()=== IndiviualStatus[IndiviualStatus.Cancel]){
        refund+=(Number(hotel.cost)-Number(hotel.discount));
        //console.log("hotel cancel"+hotel.Id);
        this.CancelComponent=true;
      }
        
    } 
      )
    this.Trip.Car.forEach( car =>{
      amount+=(Number(car.cost)-Number(car.discount))
      if(car.status.toString()=== IndiviualStatus[IndiviualStatus.Cancel]){
        refund+=(Number(car.cost)-Number(car.discount));
        this.CancelComponent=true;
        //console.log("car cancel"+car.Id);
      }
       
    }
      
      )
    this.TotalAmount=amount.toString();
    this.TotalRefund=refund.toString();
  }
}
