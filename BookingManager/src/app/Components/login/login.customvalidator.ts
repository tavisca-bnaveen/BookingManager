import {AbstractControl} from '@angular/forms';

export class LoginCustomValidator{

    static checkEmailRegex(control:AbstractControl):any{
        let email=control.value;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)){
            return null;
        }
        else 
        return {EmailPattern: false};
            
        
    }
}