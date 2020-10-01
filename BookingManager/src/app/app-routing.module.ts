import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItineraryComponent } from './Components/itinerary/itinerary.component';
import { LoginComponent } from './Components/login/login.component';
import { PostBookingComponent } from './Components/post-booking/post-booking.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [

    {path:"",redirectTo:"Login",pathMatch:'full'},
    {path:"Login",component:LoginComponent},
    {path:"PostBooking",component:PostBookingComponent,canActivate:[AuthGuard]},
    {path:"Itineray",component:ItineraryComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
