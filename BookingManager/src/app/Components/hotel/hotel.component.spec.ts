import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';

import { FlightComponent } from '../flight/flight.component';


import { ItineraryComponent } from '../itinerary/itinerary.component';
import { PaymentComponent } from '../payment/payment.component';
import { PostBookingComponent } from '../post-booking/post-booking.component';

import {APP_BASE_HREF} from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewColorDirective } from 'src/app/CustomDirectives/View.Directive.Color';
import { AddClassDirective } from 'src/app/CustomDirectives/AddClass.hover.Directive';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../header/header.component';

import { IndiviualStatus } from 'src/app/Models/status';
import { Car } from 'src/app/Models/Car';
import { CarComponent } from '../car/car.component';
import { HotelComponent } from './hotel.component';
import { Hotel } from 'src/app/Models/Hotel';

describe('HotelComponent', () => {
    let component: HotelComponent;
    let fixture: ComponentFixture<HotelComponent>;
    let button:HTMLElement;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ AppComponent,
          LoginComponent,
          HeaderComponent,
          PostBookingComponent,
          FlightComponent,
          HotelComponent,
          CarComponent,
          ItineraryComponent,
          PaymentComponent,ViewColorDirective,AddClassDirective],
        imports:[BrowserModule,
          AppRoutingModule,
          FormsModule,
          HttpClientModule,NgxSpinnerModule,
          CommonModule,ReactiveFormsModule],
        providers: [{provide: APP_BASE_HREF, useValue : '/' }]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      localStorage.setItem('TokenManager','bnaveen@tavisca.com');
      fixture = TestBed.createComponent(HotelComponent);
      component = fixture.componentInstance;
      let hotel =new Hotel;
      hotel.id ="01";
      hotel.name="BMW";
      hotel.location="Lax";
      hotel.checkin="01-10-2020";
      component.confirm=true;
      component.hotelStatus="Confirm";
      hotel.status=IndiviualStatus.Confirm;
      hotel.checkout="05-10-2020";
      hotel.cost="100";
      hotel.discount="0";
      component.TripId="12345";
      component.tripid=component.TripId;
      component.Hoteldetails= hotel;
      component.hoteldetails=component.Hoteldetails;
      
      fixture.detectChanges();
    });
    it('should get hotel status',()=>{
        component._Confirm="0";
        component.ngOnInit();
        component.getHotelStatus();
        expect().nothing;

    });
    it('should get hotel status',()=>{
        component._Confirm="0";
        component.ngOnInit();
        component.CancelHotel();
        expect().nothing;

    });
});