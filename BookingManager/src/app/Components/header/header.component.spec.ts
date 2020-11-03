import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
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
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/Models/UserProfile';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { LoggedinAction } from '../login/State/Login.Actions';
import { MyFooterComponent } from 'src/app/Litelements/Footer-Element';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { ProfileService } from 'src/app/Services/Profile/Profile.Service';
import {  observable, Observable, of } from 'rxjs';
import { TripProfile } from 'src/app/Models/Profile';
import { NameService } from 'src/app/Services/Communication/Name.service';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let button:HTMLElement;
    let _profileService;
    let _nameService;
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
  
    beforeEach(inject([ProfileService,NameService],(ps,ns) => {
      _profileService=ps;
      _nameService=ns;
      let naveen="naveen"
      ns.NotifyName=of(naveen);
      localStorage.setItem('TokenManager','fool');
      localStorage.setItem('IsLoginThroughApi',"true");
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      var profile =new TripProfile();
      profile.name="naveen";
      spyOn(_profileService,'GetProfileById').and.returnValue(of(profile));
      
      component.ngOnInit();
      fixture.detectChanges();
    }));
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
        component.store.dispatch(LoggedinAction({response:true}));
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
    it('should open change password page',()=>{
      component.openChangePassword();
      expect().nothing;
    });
});
  