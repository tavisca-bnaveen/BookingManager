import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { _ParseAST } from '@angular/compiler';
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
import { MyFooterComponent } from 'src/app/Litelements/Footer-Element';
import { Gender } from 'src/app/Models/Gender';
import { TripProfile } from 'src/app/Models/Profile';
import { ProfileService } from 'src/app/Services/Profile/Profile.Service';
import { CarComponent } from '../car/car.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { FlightComponent } from '../flight/flight.component';
import { HeaderComponent } from '../header/header.component';
import { HotelComponent } from '../hotel/hotel.component';
import { ItineraryComponent } from '../itinerary/itinerary.component';
import { LoginComponent } from '../login/login.component';
import { LoggedinAction } from '../login/State/Login.Actions';
import { LoginEffects } from '../login/State/Login.Effects';
import { LoginReducer } from '../login/State/Login.Reducer';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { PaymentComponent } from '../payment/payment.component';
import { PostBookingComponent } from '../post-booking/post-booking.component';

import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
 
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

  beforeEach(()=>{
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem('IsLoginThroughApi',"true");
    component.store.dispatch(LoggedinAction({response:true}));

  });

  it('should create', () => {
    
    component.ngOnInit();
    
  });
});
