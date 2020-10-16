import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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


describe('ItineraryComponent', () => {
    let component: ItineraryComponent;
    let fixture: ComponentFixture<ItineraryComponent>;
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
        fixture = TestBed.createComponent(ItineraryComponent);
        component = fixture.componentInstance;
        
        fixture.detectChanges();
      });
    it('should get trips',()=>{

      
      component.ngOnInit();
      expect().nothing;
    })
});