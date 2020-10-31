import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { CarComponent } from '../car/car.component';
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
import { HeaderComponent } from './header.component';
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from '../login/State/Login.Reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginEffects } from '../login/State/Login.Effects';
import { EffectsModule } from '@ngrx/effects';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Profile } from 'src/app/Models/UserProfile';
describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
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
  
    beforeEach(() => {
      localStorage.setItem('TokenManager','fool');
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();
    });
    it('should logout the session',()=>{
        localStorage.setItem('TokenManager','fool');
        localStorage.setItem('Picture','xyz');
        localStorage.setItem('Name','naveen');
        component.ngOnInit();
        component.Logout();
        expect(localStorage.getItem('Name')).toEqual(null);
        expect(localStorage.getItem('Picture')).toEqual(null);
        expect(localStorage.getItem('TokenManager')).toEqual(null);
    });
    it('should navigate to home',()=>{
        localStorage.setItem('TokenManager','fool');
        localStorage.setItem('Picture','xyz');
        localStorage.setItem('Name','naveen');
        component.ngOnInit();
        component.home();
        var _profile=new Profile();
        _profile.email="bnaveen@tavisca.com";
        component.UserData=_profile;
        component.userdata=_profile;
        component.UserData = component.userdata;
        expect(localStorage.getItem('Name')).toEqual("naveen");
        
    });
    
});
  