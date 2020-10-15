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
  TotalCancelledComponents:number;
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
    this.TotalCancelledComponents=0;
  }
  calculateTotalAmount(){
    let amount=0;
    let refund=0;
    if(this.Trip.flight){
      amount+=(Number(this.Trip.flight.cost)-Number(this.Trip.flight.discount));
      if(this.Trip.flight.status.toString()=== FlightStatus[FlightStatus.Cancel]){
      
        this.TotalCancelledComponents+=1;
        this.CancelComponent=true;
        refund+=(Number(this.Trip.flight.cost)-Number(this.Trip.flight.discount));
      }
    }
    this.Trip.hotel.forEach( hotel =>{
      amount+=(Number(hotel.cost)-Number(hotel.discount));
      if(hotel.status.toString()=== IndiviualStatus[IndiviualStatus.Cancel]){
        refund+=(Number(hotel.cost)-Number(hotel.discount));
        //console.log("hotel cancel"+hotel.Id);
        this.CancelComponent=true;
        this.TotalCancelledComponents+=1;
      }
      else{

      }
        
    } 
      )
    this.Trip.car.forEach( car =>{
      amount+=(Number(car.cost)-Number(car.discount))
      if(car.status.toString()=== IndiviualStatus[IndiviualStatus.Cancel]){
        refund+=(Number(car.cost)-Number(car.discount));
        this.CancelComponent=true;
        this.TotalCancelledComponents+=1;
        //console.log("car cancel"+car.Id);
      }
       
    }
      
      )
    this.TotalAmount=amount.toString();
    this.TotalRefund=refund.toString();
  }
}
