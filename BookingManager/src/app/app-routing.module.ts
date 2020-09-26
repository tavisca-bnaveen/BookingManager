import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PostBookingComponent } from './Components/post-booking/post-booking.component';

const routes: Routes = [

    {path:"",redirectTo:"Login",pathMatch:'full'},
    {path:"Login",component:LoginComponent},
    {path:"PostBooking",component:PostBookingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
