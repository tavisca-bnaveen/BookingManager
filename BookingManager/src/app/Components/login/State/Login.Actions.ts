import { createAction, props } from '@ngrx/store';
import { LoginDetails } from 'src/app/Models/LoginDetails';

export const RememberAction = createAction('Remember value', props<{remember:boolean}>());
export const LoginAction = createAction('Save login values', props<{details:LoginDetails}>());