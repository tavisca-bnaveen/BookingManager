import { state } from '@angular/animations';
import { EmailValidator } from '@angular/forms';
import { createAction, createReducer, on, props } from '@ngrx/store';
import { RememberAction,LoginAction, LoggedinAction, LoggedOutAction } from './Login.Actions';
import * as AppState from './../../../NgrxState/app.ngrxstate';


export interface LoginState{
    Remember:boolean;
    Email:string;
    Password:string;
    IsLoginThroughApi:boolean
}
export interface LoginAppState extends AppState.State{
    Login:LoginState;
}
export const Intialstate:LoginState={
    Remember:false,
    Email:"",
    Password:"",
    IsLoginThroughApi:false
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
        }}),
    on(LoggedinAction,(state,action)=>{
        
        return{
            ...state,
            IsLoginThroughApi:action.response
        }}),
    on(LoggedOutAction,(state)=>{
        
        return{
            ...state,
            IsLoginThroughApi:false
    }})
    
 );