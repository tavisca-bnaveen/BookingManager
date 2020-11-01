import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';

import { FlightComponent } from '../flight/flight.component';

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
import { CarComponent } from './car.component';
import { IndiviualStatus } from 'src/app/Models/status';
import { Car } from 'src/app/Models/Car';
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from '../login/State/Login.Reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginEffects } from '../login/State/Login.Effects';
import { EffectsModule } from '@ngrx/effects';
import { of } from 'rxjs';
import { TripserviceService } from 'src/app/Services/TripService/tripservice.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChangePasswordComponent } from '../change-password/change-password.component';

describe('CarComponent', () => {
    let component: CarComponent;
    let fixture: ComponentFixture<CarComponent>;
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
      fixture = TestBed.createComponent(CarComponent);
      component = fixture.componentInstance;
      let car =new Car;
      car.id ="01";
      car.name="BMW";
      car.pickUp="Lax";
      car.pickupdate="01-10-2020";
      component.confirm=true;
      component.carStatus="Confirm";
      car.status=IndiviualStatus.Confirm;
      car.dropOff="Las";
      car.dropOffDate="05-10-2020";
      car.cost="100";
      car.discount="0";
      component.TripId="12345";
      component.tripid=component.TripId;
      component.Cardetails= car;
      component.cardetails=component.Cardetails;
      
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
    it('should get the car status ',()=>{
        component._Confirm="0";
        component.ngOnInit();
        component.getCarStatus();
        // fixture.detectChanges();
        expect().nothing;
    });
    it('should send  car cancellation request  ',()=>{
        component._Confirm="0";
        component.ngOnInit();
        component.CancelCar();
        // fixture.detectChanges();
        expect().nothing;
    });
    it('should test cancel car',()=>{
      const response=true;
      component.cardetails.id="01";
      component.TripId="12345";
      spyOn(_TripService,'CancelCar').and.returnValue(of(response));
      component.CancelCar();
      expect(component.confirm).toEqual(false);
    })
    it('should test get car status',()=>{
      const response="Cancel";
      component.cardetails.id="01";
      component.TripId="12345";
      component.carStatus="Confirm";
      spyOn(_TripService,'GetCarStatus').and.returnValue(of(response));
      component.getCarStatus();
      expect(component.carStatus).toEqual("Cancel");
    })
});