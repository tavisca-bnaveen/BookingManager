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
import { ItineraryComponent } from '../itinerary/itinerary.component';
import { PaymentComponent } from '../payment/payment.component';
import {APP_BASE_HREF} from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewColorDirective } from 'src/app/CustomDirectives/View.Directive.Color';
import { AddClassDirective } from 'src/app/CustomDirectives/AddClass.hover.Directive';
import { PostBookingComponent } from './post-booking.component';
import { Trip } from 'src/app/Models/Trip';


describe('PostBookingComponent', () => {
    let component: PostBookingComponent;
    let fixture: ComponentFixture<PostBookingComponent>;
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
        localStorage.setItem('TokenManager','fool');
        fixture = TestBed.createComponent(PostBookingComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
      });
      it('should parse value route token', () => {
          localStorage.setItem('TokenManager','bnaveen@tavisca.com');
          component.activatedRoute.snapshot.fragment="access_token=2uTMAcJRE1Ps8JoBV022BEn9OP2-v7od&scope=openid%20profile%20email&expires_in=7200&token_type=Bearer";
          component.ngOnInit();
        const element = fixture.nativeElement;
        
        expect(localStorage.getItem('TokenManager')).toEqual('bnaveen@tavisca.com');
      });
      it('should parse empty route token', () => {
        localStorage.setItem('TokenManager','fool');
        component.activatedRoute.snapshot.fragment=null;
        component.ngOnInit();
        const element = fixture.nativeElement;
      
        expect(localStorage.getItem('TokenManager')).toEqual('fool');
    });
    it('should check view itineray', () => {
        const element = fixture.nativeElement;
        let _trip=new Trip;
        _trip.id="12345"
        component.ViewItinerayDetails(_trip)
      
        expect(localStorage.getItem('TripId')).toEqual('12345');
    });
});