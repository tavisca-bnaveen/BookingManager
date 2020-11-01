import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';



import { HotelComponent } from '../hotel/hotel.component';
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
import { FlightComponent } from './flight.component';
import { Flight } from 'src/app/Models/Flight';
import { FlightType } from 'src/app/Models/FlghtType';
import { FlightStatus } from 'src/app/Models/FlightStatus';
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from '../login/State/Login.Reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginEffects } from '../login/State/Login.Effects';
import { EffectsModule } from '@ngrx/effects';
import { TripserviceService } from 'src/app/Services/TripService/tripservice.service';
import { inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChangePasswordComponent } from '../change-password/change-password.component';

describe('FlightComponent', () => {
    let component: FlightComponent;
    let fixture: ComponentFixture<FlightComponent>;
    let button:HTMLElement;
    let _TripService;
  
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
          PaymentComponent,ViewColorDirective,AddClassDirective, ChangePasswordComponent],
        imports:[BrowserModule,
          AppRoutingModule,
          FormsModule,
          HttpClientModule,NgxSpinnerModule,
          CommonModule,ReactiveFormsModule,StoreModule.forRoot({})
          ,StoreModule.forFeature("Login",LoginReducer),
          StoreDevtoolsModule.instrument({
            name:"Booking Manager",
            maxAge:40,
            
          }),
          EffectsModule.forRoot([LoginEffects])],
        providers: [{provide: APP_BASE_HREF, useValue : '/' }],
        schemas:[CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
    }));
  
    beforeEach(inject([TripserviceService], s => {
      _TripService = s;
      localStorage.setItem('TokenManager','bnaveen@tavisca.com');
      fixture = TestBed.createComponent(FlightComponent);
      component = fixture.componentInstance;
      let flight =new Flight;
      flight.pnr="PLMNJ";
      flight.type=FlightType.Multiway;
      flight.source=["Las","Lax","NYC"];
      flight.destination=["Lax","NYC","Las"];
      flight.deparatureTimes=["20-9-2020 12:30PM","21-9-2020 12:30PM","22-9-2020 12:30PM"];
      flight.arrivalTimes=["20-9-2020 5:00PM","21-9-2020 5:30PM","22-9-2020 5:30PM"];
	  flight.status=FlightStatus.Cancel	
      flight.cost="1200";
      flight.discount="1";
      flight.airlineDetails=["American Airlines","Delta Airlines","American Airlines"];
      flight.passengerCount="1";
      component.TripId="12345";
      component.tripid=component.TripId;
      component.Flightdetails=flight;
      component.flightdetails=component.Flightdetails;
      fixture.detectChanges();
    }));
    it('should close popup',()=>{
      component.PopupOutput(false);
      expect(component.ShowPopup).toBeFalsy();
    });
    it('should complete the popup',()=>{
      component.PopupOutput(true);
      expect(component.ShowPopup).toBeFalsy();
    });
    it('should open the popup',()=>{
      component.openPopUp();
      expect(component.ShowPopup).toBeTruthy();
    });
    it('it should check flight status',()=>{
        component._Cancel="1";
        component.ngOnInit();
        component.getFlightStatus();
        expect().nothing;
    })
    it('it should  cancel flight status',()=>{
        component._Cancel="1";
        component.ngOnInit();
        component.cancel=false;
        component.CancelFlight();
        expect().nothing;
    })
    it('should test cancel Flight',()=>{
      const response=true;
      
      component.TripId="12345";
      component.flightdetails.pnr="QWERTY";
      spyOn(_TripService,'CancelFlight').and.returnValue(of(response));
      component.CancelFlight();
      expect(component.cancel).toEqual(true);
    })
    it('should test get Flight status',()=>{
      const response="Cancel";
      
      component.TripId="12345";
      component.flightdetails.pnr="QWERTY";
      component.flightStatus="Confirm";
      spyOn(_TripService,'GetFlightStatus').and.returnValue(of(response));
      component.getFlightStatus();
      expect(component.flightStatus).toEqual("Cancel");
    })
});