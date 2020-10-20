import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState } from './Login.Reducer';

const LoginSelector =createFeatureSelector<LoginState>('Login');

export const GetRemembervalue = createSelector(
    LoginSelector,
    state => state.Remember
);
export const GetLoginState = createSelector(
    LoginSelector,
    state => state
);