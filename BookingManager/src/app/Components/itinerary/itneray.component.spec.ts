import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router , ActivatedRoute, Params} from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { CarComponent } from '../car/car.component';
import { FlightComponent } from '../flight/flight.component';
import { HeaderComponent } from '../header/header.component';
import { HotelComponent } from '../hotel/hotel.component';

import { PaymentComponent } from '../payment/payment.component';


import {APP_BASE_HREF} from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewColorDirective } from 'src/app/CustomDirectives/View.Directive.Color';
import { AddClassDirective } from 'src/app/CustomDirectives/AddClass.hover.Directive';

import { Trip } from 'src/app/Models/Trip';
import { PostBookingComponent } from '../post-booking/post-booking.component';
import { ItineraryComponent } from './itinerary.component';
import { IndiviualStatus } from 'src/app/Models/status';
import { Car } from 'src/app/Models/Car';
import { Flight } from 'src/app/Models/Flight';
import { FlightType } from 'src/app/Models/FlghtType';
import { FlightStatus } from 'src/app/Models/FlightStatus';
import { Hotel } from 'src/app/Models/Hotel';
import { OverallStatus } from 'src/app/Models/OverallStatus';
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from '../login/State/Login.Reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from '../login/State/Login.Effects';

import { TripserviceService } from 'src/app/Services/TripService/tripservice.service';
import { Observable, of, throwError } from 'rxjs';
import { inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MyFooterComponent } from 'src/app/Litelements/Footer-Element';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { ProfilePageComponent } from '../profile-page/profile-page.component';


describe('ItineraryComponent', () => {
    let component: ItineraryComponent;
    let fixture: ComponentFixture<ItineraryComponent>;
    let button:HTMLElement;
    let _tripService;
  
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
          PaymentComponent,ViewColorDirective,AddClassDirective, ChangePasswordComponent,MyFooterComponent, MyProfileComponent, ProfilePageComponent],
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
    beforeEach(inject([TripserviceService],s => {
        _tripService=s;
        localStorage.setItem('TokenManager','bnaveen@tavisca.com');
        
        fixture = TestBed.createComponent(ItineraryComponent);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
      }));
    it('should get trips',fakeAsync(()=>{
      var trips=new Array<Trip>();
      let _car =new Car;
        let _flight =new Flight;
        let _hotel =new Hotel;
        _car.id ="01";
        _car.name="BMW";
        _car.pickUp="Lax";
        _car.pickupdate="01-10-2020";
        _car.status=IndiviualStatus.Cancel;
        _car.dropOff="Las";
        _car.dropOffDate="05-10-2020";
        _car.cost="100";
        _car.discount="0";
        
        _flight.pnr="PLMNJ";
        _flight.type=FlightType.Multiway;
        _flight.source=["Las","Lax","NYC"];
        _flight.destination=["Lax","NYC","Las"];
        _flight.deparatureTimes=["20-9-2020 12:30PM","21-9-2020 12:30PM","22-9-2020 12:30PM"];
        _flight.arrivalTimes=["20-9-2020 5:00PM","21-9-2020 5:30PM","22-9-2020 5:30PM"];
        _flight.status=FlightStatus.Cancel	
        _flight.cost="1200";
        _flight.discount="0";
        _flight.airlineDetails=["American Airlines","Delta Airlines","American Airlines"];
        _flight.passengerCount="1";
        
        _hotel.id ="01";
        _hotel.name="BMW";
        _hotel.location="Lax";
        _hotel.checkin="01-10-2020";
        _hotel.status=IndiviualStatus.Cancel;
        _hotel.checkout="05-10-2020";
        _hotel.cost="100";
        _hotel.discount="0";
        
        var _trip = new Trip;
        _trip.id = "12345";
        _trip.flight=_flight;
        _trip.hotel=[_hotel];
        _trip.car=[_car];
        _trip.bookedDate='01-10-2020';
        _trip.status=OverallStatus.Confirmed;
        trips.push(_trip);
        const response=trips;
        spyOn(_tripService,'GetAllTrips').and.returnValue(of(response));
        
        component.ngOnInit();
        localStorage.setItem('TripId','12345');
        component.ngOnInit();
        tick(1000);
        // jasmine.clock().tick(1000);
      expect(component.trip.flight.pnr).toEqual("PLMNJ");
      
    }));
    it('should test error while getting trips',()=>{
        component.NoTrip=false;
        component.ngOnInit();
        spyOn(_tripService,'GetAllTrips').and.returnValue((throwError({status: 404})));
        
        component.ngOnInit();
        expect(component.NoTrip).toEqual(true);
      
    });
});