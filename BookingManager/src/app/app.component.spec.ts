import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HeaderComponent } from './Components/header/header.component';
import { PostBookingComponent } from './Components/post-booking/post-booking.component';
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from './Guard/auth.guard';
import { FlightComponent } from './Components/flight/flight.component';
import { HotelComponent } from './Components/hotel/hotel.component';
import { CarComponent } from './Components/car/car.component';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { ItineraryComponent } from './Components/itinerary/itinerary.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ViewColorDirective } from './CustomDirectives/View.Directive.Color';
import { AddClassDirective } from './CustomDirectives/AddClass.hover.Directive';
import {NgxSpinnerModule} from 'ngx-spinner';
describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
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
        localStorage.setItem('TripId','12345');
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
      });
      it('should check title',()=>{
          expect(component.title.toLowerCase()).toEqual('bookingmanager');
      })
    });
