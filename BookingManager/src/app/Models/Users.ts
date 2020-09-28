import { Profile } from './UserProfile';

export class AuthenticateUsers{
    private Users:Array<Profile>;

    constructor(){
        this.Users=new Array<Profile>();
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
        return this.Users;
    }
}