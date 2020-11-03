import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
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
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from '../login/State/Login.Reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginEffects } from '../login/State/Login.Effects';
import { EffectsModule } from '@ngrx/effects';
import { TripserviceService } from 'src/app/Services/TripService/tripservice.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MyFooterComponent } from 'src/app/Litelements/Footer-Element';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { ProfilePageComponent } from '../profile-page/profile-page.component';

describe('HotelComponent', () => {
    let component: HotelComponent;
    let fixture: ComponentFixture<HotelComponent>;
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
    it('should test cancel hotel',()=>{
      const response=true;
      component.hoteldetails.id="01";
      component.TripId="12345";
      spyOn(_tripService,'CancelHotel').and.returnValue(of(response));
      component.CancelHotel();
      expect(component.confirm).toEqual(false);
    })
    it('should test get car status',()=>{
      const response="Cancel";
      component.hoteldetails.id="01";
      component.TripId="12345";
      component.hotelStatus="Confirm";
      spyOn(_tripService,'GetHotelStatus').and.returnValue(of(response));
      component.getHotelStatus();
      expect(component.hotelStatus).toEqual("Cancel");
    })
});