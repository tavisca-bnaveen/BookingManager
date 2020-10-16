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
import { HeaderComponent } from '../header/header.component';
import { HotelComponent } from '../hotel/hotel.component';
import { ItineraryComponent } from '../itinerary/itinerary.component';
import { PaymentComponent } from '../payment/payment.component';
import { PostBookingComponent } from '../post-booking/post-booking.component';
import { LoginComponent } from './login.component';
import {APP_BASE_HREF} from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewColorDirective } from 'src/app/CustomDirectives/View.Directive.Color';
import { AddClassDirective } from 'src/app/CustomDirectives/AddClass.hover.Directive';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.formLogin.setValue({'formEmail':"","formPassword":""});
    fixture.detectChanges();
  });

  it('should test local storage value when google authencation happens', () => {
    const element = fixture.nativeElement;
    button= element.querySelector('.google-login');
    const googleButtonClick= button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(localStorage.getItem('TokenManager')).toEqual('fool');
  });

  it('should test fool case', () => {
    
    const element = fixture.nativeElement; 
    expect(localStorage.getItem('TokenManager')).toEqual(null);
  });
  it('it should check for incorrect login',()=>{

    component.formLogin.setValue({'formEmail':"bnaveen@tavisca.com","formPassword":"1234567"});
    component.username=component.formLogin.controls.formEmail.value;
    const element = fixture.nativeElement;
    button= element.querySelector('.login-sumbit');
    const googleButtonClick= button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(localStorage.getItem('TokenManager')).toEqual(null);
  });
  it('it should check for correct login',()=>{
    // let formLogin=new FormGroup({});
    // formLogin.setValue({'formEmail':"bnaveen@tavisca.com","formPassword":"123456"});
    component.formLogin.setValue({'formEmail':"bnaveen@tavisca.com","formPassword":"123456"});
    component.username=component.formLogin.controls.formEmail.value;
    const element = fixture.nativeElement;
    button= element.querySelector('.login-sumbit');
    const googleButtonClick= button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(localStorage.getItem('TokenManager')).toEqual(null);
  });
});
