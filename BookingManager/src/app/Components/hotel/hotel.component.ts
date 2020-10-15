import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from 'src/app/Models/Hotel';
import { IndiviualStatus } from 'src/app/Models/status';
import { TripserviceService } from 'src/app/Services/TripService/tripservice.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {


  
  tripid:string;
  hoteldetails:Hotel;
  confirm:boolean;
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

  constructor(private tripservice:TripserviceService) { }
  hotelStatus:string;
  ngOnInit() {
    var _confirm=IndiviualStatus[IndiviualStatus.Confirm];
    if(this.hoteldetails.status.toString() === _confirm.toString() )
    {
      this.confirm=true;
      
    }
    this.hotelStatus=this.hoteldetails.status.toString();
      
  }
  CancelHotel(){
      this.tripservice.CancelHotel(this.TripId,this.hoteldetails.id).subscribe(
        data => {
          this.confirm=false;
          this.hotelStatus= IndiviualStatus[IndiviualStatus.Cancel].toString();
          window.location.reload();
        }
      )
      //window.location.reload();
  }
  getHotelStatus(){
    this.tripservice.GetHotelStatus(this.TripId,this.hoteldetails.id).subscribe(
      data => {
        this.hotelStatus=data;
        window.location.reload();
      }
    )
  }

}
