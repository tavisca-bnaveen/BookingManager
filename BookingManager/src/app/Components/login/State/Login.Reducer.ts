import { state } from '@angular/animations';
import { EmailValidator } from '@angular/forms';
import { createAction, createReducer, on, props } from '@ngrx/store';
import { RememberAction,LoginAction } from './Login.Actions';

export const Intialstate={
    Remember:false,
    Email:"",
    Password:"",
}
export const LoginReducer=createReducer(Intialstate,
    on(RememberAction,(state,{remember})=>{
        // console.log("Hi from remember")
        // console.log(state);
        
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