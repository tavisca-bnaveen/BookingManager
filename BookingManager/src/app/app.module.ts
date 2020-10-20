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
import { CommonModule } from '@angular/common';
import { ItineraryComponent } from './Components/itinerary/itinerary.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ViewColorDirective } from './CustomDirectives/View.Directive.Color';
import { AddClassDirective } from './CustomDirectives/AddClass.hover.Directive';
import {NgxSpinnerModule} from 'ngx-spinner';
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from './Components/login/State/Login.Reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './Components/login/State/Login.Effects';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    PostBookingComponent,
    FlightComponent,
    HotelComponent,
    CarComponent,
    ItineraryComponent,
    PaymentComponent,ViewColorDirective,AddClassDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,NgxSpinnerModule,
    CommonModule,ReactiveFormsModule,StoreModule.forRoot({})
    ,StoreModule.forFeature("Login",LoginReducer),
    StoreDevtoolsModule.instrument({
      name:"Booking Manager",
      maxAge:40,
      
    }),
    EffectsModule.forRoot([LoginEffects])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
