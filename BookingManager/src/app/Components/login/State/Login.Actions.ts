import { createAction, props } from '@ngrx/store';
import { LoginDetails } from 'src/app/Models/LoginDetails';

export const RememberAction = createAction('Remember value', props<{remember:boolean}>());
export const LoginAction = createAction('Save login values', props<{details:LoginDetails}>());
export const LoggedinAction=createAction(' is User logged in through api', props<{response:boolean}>());
export const LoggedOutAction=createAction('User Logged out');
export const SendLoginRequest=createAction('Login request sent',props<{details:LoginDetails}>());