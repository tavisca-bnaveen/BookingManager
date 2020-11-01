import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from './../login/State/Login.Reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './../login/State/Login.Effects';
import { LoginService } from 'src/app/Services/Login/login.service';
import { AuthenticateUsers } from 'src/app/Models/Users';
import { Profile } from 'src/app/Models/UserProfile';
import {  CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import {  inject } from '@angular/core/testing';
import { AuthGuard } from 'src/app/Guard/auth.guard';
import {Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { AuthencticationService } from 'src/app/Services/Auth0/authenctication.service';
import { TripserviceService } from 'src/app/Services/TripService/tripservice.service';
import { of, throwError } from 'rxjs';
import { Car } from 'src/app/Models/Car';
import { Flight } from 'src/app/Models/Flight';
import { Hotel } from 'src/app/Models/Hotel';
import { IndiviualStatus } from 'src/app/Models/status';
import { FlightType } from 'src/app/Models/FlghtType';
import { FlightStatus } from 'src/app/Models/FlightStatus';
import { OverallStatus } from 'src/app/Models/OverallStatus';
import { ChangePasswordComponent } from '../change-password/change-password.component';
describe('PostBookingComponent', () => {
    let component: PostBookingComponent;
    let fixture: ComponentFixture<PostBookingComponent>;
    let button:HTMLElement;
    let _AuthencticationService;
    let _TripService;
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
        providers: [LoginService,{provide: APP_BASE_HREF, useValue : '/' }],
        schemas:[CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
    }));
    beforeEach(inject([AuthencticationService, TripserviceService],(s,TripService) => {
        _AuthencticationService=s;
        _TripService=TripService;
        localStorage.setItem('TokenManager','fool');
        fixture = TestBed.createComponent(PostBookingComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
      }));
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
        localStorage.setItem('TokenManager','bnaveen');
        component.ngOnInit();
        expect(localStorage.getItem('TokenManager')).toEqual('bnaveen');
    });
    it('should check view itineray', () => {
        const element = fixture.nativeElement;
        let _trip=new Trip;
        _trip.id="12345"
        component.ViewItinerayDetails(_trip)
      
        expect(localStorage.getItem('TripId')).toEqual('12345');
    });
    it('should add user', () => {
      const element = fixture.nativeElement;
      var profile=new Profile();
      profile.email="bnaveen@tavisca.com";
      var profile2=new Profile();
      profile2.email="vamsi@tavisca.com";
      component.AllUsers.AddUser(profile2);
      component.AllUsers.AddUser(profile);
      component.AllUsers.AddUser(profile);
      if(!component.AllUsers.CheckUser("xxx@gmail.com")){
        var _user=component.AllUsers.getUser("xxx@gmail.com");
        _user=component.AllUsers.getUser(profile.email);
      }
    expect(component.AllUsers.GetAllUsers().length).toEqual(2);
  });
  it('should test unauthorized', () => {
    localStorage.clear();
    var _authGaurd= new AuthGuard(component.router);
    _authGaurd.canActivate();
    expect().nothing;

    
  });

  it('should check mouse operations in view color directive',()=> {
    
    var _directive= new ViewColorDirective(component._element,component._render);

    _directive.mouseenter();
    _directive.mouseleave();
    expect().nothing;
  });
  it('should check mouse operations in AddClass directive',()=> {
    
    var _directive= new AddClassDirective(component._render,component._element);

    _directive.mouseenter();
    _directive.mouseleave();
    
    expect().nothing;
  });
  it('should test autho profile',()=>{
    const response= new Profile();
    response.email="bnaveen@tavisca.com";
    response.name="Naveen, bora";
    response.password="";
    response.picture="Hey";
    response.sub="223";
    spyOn(_AuthencticationService,'GetUserInfo').and.returnValue(of(response));
    localStorage.setItem('TokenManager','bnaveen@tavisca.com');
    component.activatedRoute.snapshot.fragment="access_token=2uTMAcJRE1Ps8JoBV022BEn9OP2-v7od&scope=openid%20profile%20email&expires_in=7200&token_type=Bearer";
    component.ngOnInit();
    expect(localStorage.getItem('picture')).toEqual("Hey");
  });
  it('should test error autho profile',()=>{
    
    spyOn(_AuthencticationService,'GetUserInfo').and.returnValue(throwError({status:400}));
    localStorage.setItem('TokenManager','bnaveen@tavisca.com');
    component.activatedRoute.snapshot.fragment="access_token=2uTMAcJRE1Ps8JoBV022BEn9OP2-v7od&scope=openid%20profile%20email&expires_in=7200&token_type=Bearer";
    component.ngOnInit();
    expect(localStorage.getItem('TokenManager')).toEqual(null);
  })
  it('should get trips',fakeAsync(()=>{
    var trips=new Array<Trip>();
    let _car =new Car;
      let _flight =new Flight;
      let _hotel =new Hotel;
      _car.id ="01";
      _car.name="BMW";
      _car.pickUp="Lax";
      _car.pickupdate="01-10-2020";
      _car.status=IndiviualStatus.Cancel;
      _car.dropOff="Las";
      _car.dropOffDate="05-10-2020";
      _car.cost="100";
      _car.discount="0";
      
      _flight.pnr="PLMNJ";
      _flight.type=FlightType.Multiway;
      _flight.source=["Las","Lax","NYC"];
      _flight.destination=["Lax","NYC","Las"];
      _flight.deparatureTimes=["20-9-2020 12:30PM","21-9-2020 12:30PM","22-9-2020 12:30PM"];
      _flight.arrivalTimes=["20-9-2020 5:00PM","21-9-2020 5:30PM","22-9-2020 5:30PM"];
      _flight.status=FlightStatus.Cancel	
      _flight.cost="1200";
      _flight.discount="0";
      _flight.airlineDetails=["American Airlines","Delta Airlines","American Airlines"];
      _flight.passengerCount="1";
      
      _hotel.id ="01";
      _hotel.name="BMW";
      _hotel.location="Lax";
      _hotel.checkin="01-10-2020";
      _hotel.status=IndiviualStatus.Cancel;
      _hotel.checkout="05-10-2020";
      _hotel.cost="100";
      _hotel.discount="0";
      
      var _trip = new Trip;
      _trip.id = "12345";
      _trip.flight=_flight;
      _trip.hotel=[_hotel];
      _trip.car=[_car];
      _trip.bookedDate='01-10-2020';
      _trip.status=OverallStatus.Confirmed;
      trips.push(_trip);
      const response=trips;
      spyOn(_TripService,'GetAllTrips').and.returnValue(of(response));
      
      component.ngOnInit();
      tick(1000);
      // jasmine.clock().tick(1000);
    expect(component.AllTrips.length).toEqual(1);
    
  }));
  it('should test error get trips',fakeAsync(()=>{
      spyOn(_TripService,'GetAllTrips').and.returnValue(throwError({status:400}));
      
      component.ngOnInit();
      tick(1000);
      // jasmine.clock().tick(1000);
    expect(component.AllTrips.length).toEqual(0);
    
  }));
  
});