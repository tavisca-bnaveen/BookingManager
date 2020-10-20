import { state } from '@angular/animations';
import { EmailValidator } from '@angular/forms';
import { createAction, createReducer, on, props } from '@ngrx/store';
import { RememberAction,LoginAction } from './Login.Actions';
import * as AppState from './../../../NgrxState/app.ngrxstate';


export interface LoginState{
    Remember:boolean;
    Email:string;
    Password:string;
}
export interface LoginAppState extends AppState.State{
    Login:LoginState;
}
export const Intialstate:LoginState={
    Remember:false,
    Email:"",
    Password:"",
}
export const LoginReducer=createReducer(Intialstate,
    on(RememberAction,(state,{remember}) : LoginState=>{

        return {
            ...state,
            Remember:remember
            
        }}),
    on(LoginAction,(state,{details})=>{
        return{
            ...state,
            Email:details.Email,
            Password:details.Password
        }})
    
 );