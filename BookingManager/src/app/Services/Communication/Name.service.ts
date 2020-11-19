import { EventEmitter, Injectable } from "@angular/core";


@Injectable({
    providedIn:'root'
})
export class NameService{

    NotifyName:EventEmitter<string>
    
    constructor() {
       this.NotifyName = new EventEmitter<string>();
    }

    changeName(name:string){
        this.NotifyName.emit(name);
    }

}