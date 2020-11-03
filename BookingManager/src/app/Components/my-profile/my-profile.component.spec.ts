import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxSpinnerModule } from 'ngx-spinner';
import { of, throwError } from 'rxjs';
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
import { LoginEffects } from '../login/State/Login.Effects';
import { LoginReducer } from '../login/State/Login.Reducer';
import { PaymentComponent } from '../payment/payment.component';
import { PostBookingComponent } from '../post-booking/post-booking.component';
import { ProfilePageComponent } from '../profile-page/profile-page.component';

import { MyProfileComponent } from './my-profile.component';

describe('MyProfileComponent', () => {
  let component: MyProfileComponent;
  let fixture: ComponentFixture<MyProfileComponent>;
  let _ProfileService;
  var _profile=new TripProfile();
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

  beforeEach(inject([ProfileService],s => {
    _ProfileService=s
    fixture = TestBed.createComponent(MyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    _profile.age=23
    _profile.name="Naveen";
    _profile.email="bnaveen@tavisca.com";
    _profile.gender=Gender.male;
    _profile.hobbies="cricket";
    _profile.joined="01-01-2020";
    
  }));

  it('should  test update and get profile', () => {
    spyOn(_ProfileService,'GetProfileById').and.returnValue(of(_profile));
    spyOn(_ProfileService,'UpdateProfileById').and.returnValue(of(true));
    //UpdateProfileById
    component.ngOnInit();
    component.updateProfile();
    expect(component.success).toBeTruthy();
  });
  it('Should test not a number',()=>{
    component.profileService.GetProfileById(_profile.email);
    component.profileService.UpdateProfileById(_profile);
    component._Age=Number('23s');
    component.updateProfile();
    expect(component.Error).toBeTruthy();
  })
  it('should  test update error', () => {
    spyOn(_ProfileService,'GetProfileById').and.returnValue(of(_profile));
    spyOn(_ProfileService,'UpdateProfileById').and.returnValue(of(false));
    
    component.ngOnInit();
    component.updateProfile();
    expect(component.Error).toBeTruthy();
  });
  it('should  test http error for update', () => {
    _profile.gender=Gender.female;
    spyOn(_ProfileService,'GetProfileById').and.returnValue(of(_profile));
    spyOn(_ProfileService,'UpdateProfileById').and.returnValue(throwError({status:400}));
    
    component.ngOnInit();
    component.updateProfile();
    expect(component.Error).toBeTruthy();
  });
  it('should  test empty details', () => {
    component._Name="";
    component._Age=0;
    component.updateProfile();
    expect(component.Error).toBeTruthy();
  });
  it('should  test edit profile', () => {
    var element= new MyFooterComponent();
    element.ngOnInit();
    component.ngOnInit();
    component.EditProfile();
    expect(component.Edit).toBeTruthy();
  });
});

