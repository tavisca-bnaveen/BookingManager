import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate():boolean{
    if(localStorage.getItem("TokenManager")){
      return true;
    }
    else{
      this.router.navigateByUrl('Login');
    }
  }
  
}
