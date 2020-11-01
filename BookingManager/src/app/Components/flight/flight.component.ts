import { Component, Input,EventEmitter, OnInit } from '@angular/core';
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
  flightStatus:string;
  _Cancel="Cancel";
  faketitle="Do you to cancel the Flight?";
  ShowPopup=false;
  ngOnInit() {
    this.cancel=false;
    var _cancel=this._Cancel;
    if(this.flightdetails.status.toString().toLowerCase() === _cancel.toString().toLowerCase() )
    {
      this.cancel=true;
      
    }
    this.flightStatus=this.flightdetails.status.toString();
  }
  CancelFlight(){
    this.tripservice.CancelFlight(this.TripId,this.flightdetails.pnr).subscribe(
      data =>{
        this.flightStatus=FlightStatus[FlightStatus.Cancel] ;
          this.cancel=true;
          window.location.reload();

      }
    )
  }
  getFlightStatus(){
    this.tripservice.GetFlightStatus(this.TripId,this.flightdetails.pnr).subscribe(
      data =>{
        
          this.flightStatus=data ;
          
          window.location.reload();
        
        

      }
    )
  }
  PopupOutput(event){
    if(event){
      this.CancelFlight();
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
