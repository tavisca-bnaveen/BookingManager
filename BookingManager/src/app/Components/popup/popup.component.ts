import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor() { }
  @Input()
  title:string;
  @Output() PopupOutput: EventEmitter<boolean>=new EventEmitter();;

  ngOnInit() {
    
  }
  NotAccept(){
    this.PopupOutput.emit(false);
  }
  Accept(){
    this.PopupOutput.emit(true);
  }
}
