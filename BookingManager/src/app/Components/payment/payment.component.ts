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
  _Cancel="Cancel";
  constructor() { }

  ngOnInit() {
    this.CancelComponent=false;
    this.TotalCancelledComponents=0;
    this.calculateTotalAmount();
    
  }
  calculateTotalAmount(){
    let amount=0;
    let refund=0;
    if(this.Trip.flight){
      amount+=(Number(this.Trip.flight.cost)-Number(this.Trip.flight.discount));
      if(this.Trip.flight.status.toString()=== this._Cancel){
      
        this.TotalCancelledComponents+=1;
        this.CancelComponent=true;
        refund+=(Number(this.Trip.flight.cost)-Number(this.Trip.flight.discount));
      }
      else{
        
      }
    }
    else{

    }
    this.Trip.hotel.forEach( hotel =>{
      amount+=(Number(hotel.cost)-Number(hotel.discount));
      if(hotel.status.toString()=== this._Cancel){
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
      if(car.status.toString()=== this._Cancel){
        refund+=(Number(car.cost)-Number(car.discount));
        this.CancelComponent=true;
        this.TotalCancelledComponents+=1;
        //console.log("car cancel"+car.Id);
      }
      else{

      }
       
    }
      
      )
    this.TotalAmount=amount.toString();
    this.TotalRefund=refund.toString();
  }
}
