import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { LoginDetails } from 'src/app/Models/LoginDetails';
import { LoginService } from 'src/app/Services/Login/login.service';
import { LoggedinAction, SendLoginRequest } from './Login.Actions';
import { EMPTY, Observable, throwError } from 'rxjs';
import { retryWhen, mergeMap, map, catchError } from 'rxjs/operators';
@Injectable()

export class LoginEffects{

    constructor(private actions$:Actions,private loginService:LoginService){}

    LoginThroughApi$= createEffect(() => this.actions$.pipe(
        ofType(SendLoginRequest),
        mergeMap((action) => this.loginService.GetAuthentication(action.details.Email,action.details.Password).pipe(
            map(data => LoggedinAction({response:data}) ),
            catchError(() => EMPTY)
        ))
    ));
    
}//LoggedinAction()