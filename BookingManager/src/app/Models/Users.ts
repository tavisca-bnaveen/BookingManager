import { LoginService } from '../Services/Login/login.service';
import { LoginDetails } from './LoginDetails';
import { Profile } from './UserProfile';

export class AuthenticateUsers{
    private Users:Array<Profile>;
    
    constructor(private loginservice:LoginService){
        this.Users=new Array<Profile>();
        this.Users=  this.GetAllUsers();
    }
    AddUser(newuser:Profile){
        if(!this.CheckUser(newuser.email))
            this.Users.push(newuser);
    }
    getUser(email:string):Profile{
        this.Users.forEach(user => {
            if(user.email == email){
                return user;
            }
        })
        return null;
    }
    CheckUser(email:string):boolean{
        this.Users.forEach(user => {
            if(user.email == email){
                return true;
            }
        })
        return false;
    }
    GetAllUsers():Array<Profile>{
        this.loginservice.GetAllUsers()
        .then((
            data => {
            this.Users=data;
            //console.log(JSON.stringify(this.Users));
            //data.forEach(dat=>console.log(dat.password)
            //)
            }
      
        ));

        return this.Users;
    }
}