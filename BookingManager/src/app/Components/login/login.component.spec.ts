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
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from './State/Login.Reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './State/Login.Effects';
import { LoggedinAction, RememberAction } from './State/Login.Actions';
import { inject } from '@angular/core/testing';
import { LoginService } from 'src/app/Services/Login/login.service';
import { of, throwError } from 'rxjs';
import { Profile } from 'src/app/Models/UserProfile';
import { AuthenticateUsers } from 'src/app/Models/Users';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChangePasswordComponent } from '../change-password/change-password.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let button:HTMLElement;
  let _loginService;
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

  beforeEach(inject([LoginService],s=> {
    _loginService=s;
    localStorage.setItem('TokenManager','fool');
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.formLogin.setValue({'formEmail':"","formPassword":""});
    fixture.detectChanges();
  }));

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
    spyOn(_loginService,'GetAuthentication').and.returnValue(throwError({status:400}));
    component.formLogin.setValue({'formEmail':"bnaveen@tavisca.com","formPassword":"1234567"});
    component.username=component.formLogin.controls.formEmail.value;
    const element = fixture.nativeElement;
    button= element.querySelector('.login-sumbit');
    const googleButtonClick= button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(localStorage.getItem('TokenManager')).toEqual(null);
  });
  it('it should check for correct login',()=>{
    
    spyOn(_loginService,'GetAuthentication').and.returnValue(of(true));
    component.RememberValues();
    component.formLogin.setValue({'formEmail':"bnaveen@tavisca.com","formPassword":"123456"});
    component.username=component.formLogin.controls.formEmail.value;
    const element = fixture.nativeElement;
    button= element.querySelector('.login-sumbit');
    const googleButtonClick= button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(localStorage.getItem('TokenManager')).toEqual("bnaveen@tavisca.com");
  });

  it('should send remember to store',()=>{
    let profiles= new Array<Profile>();
    var profile =new Profile();
    profile.email="bnaveen@tavisca.com";
    
    var profile2=new Profile();
    profile2.email="vamsi@tavisca.com";
    profiles.push(profile2);
    profiles.push(profile);
    spyOn(_loginService,'GetAllUsers').and.returnValue(of(profiles));
    var _authenticateUsersobject = new AuthenticateUsers(_loginService);
    
    component.RememberValues();
    expect(component.Checked).toEqual(true);
    component.ngOnInit()
    
  });
  it('should test get authentication method',()=>{
    component.loginService.GetAuthentication("bnaveen@tavisca.com","1212121");
    expect().nothing;
  });
});
