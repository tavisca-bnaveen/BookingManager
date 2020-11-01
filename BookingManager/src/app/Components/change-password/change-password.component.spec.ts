import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxSpinnerModule } from 'ngx-spinner';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { AddClassDirective } from 'src/app/CustomDirectives/AddClass.hover.Directive';
import { ViewColorDirective } from 'src/app/CustomDirectives/View.Directive.Color';
import { LoginService } from 'src/app/Services/Login/login.service';
import { CarComponent } from '../car/car.component';
import { FlightComponent } from '../flight/flight.component';
import { HeaderComponent } from '../header/header.component';
import { HotelComponent } from '../hotel/hotel.component';
import { ItineraryComponent } from '../itinerary/itinerary.component';
import { LoginComponent } from '../login/login.component';
import { LoginEffects } from '../login/State/Login.Effects';
import { LoginReducer } from '../login/State/Login.Reducer';
import { PaymentComponent } from '../payment/payment.component';
import { PostBookingComponent } from '../post-booking/post-booking.component';

import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let _LoginService;
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

  beforeEach(inject([LoginService], s => {
    _LoginService=s;
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should test empty values', () => {
    component.OnChangePassword();
    expect(component.ErrorText).toEqual("Fill all Details");
  });
  it('should test mismatch values', () => {
    component.CurrentPassword="12345";
    component.NewPassword="12345";
    component.RePassword="123456";
    component.OnChangePassword();
    expect(component.ErrorText).toEqual("password doesn't match");
  });
  it('should test change password',()=>{
    spyOn(_LoginService,'ChangePassword').and.returnValue(of("Password updated successfully"));
    component.CurrentPassword="12345";
    component.NewPassword="12345";
    component.RePassword="12345";
    component.OnChangePassword();
    expect(component.ErrorText).toEqual("Password updated successfully");
  });
  it('should test change password',()=>{
    // spyOn(_LoginService,'ChangePassword').and.returnValue(of("Password updated successfully"));
    component.CurrentPassword="12345";
    component.NewPassword="12345";
    component.RePassword="12345";
    
    component.OnChangePassword();
    expect(component.ShowError).toBeFalsy();
  });
});
