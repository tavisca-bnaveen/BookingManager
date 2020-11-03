import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginAppState } from '../login/State/Login.Reducer';
import { GetLoginstatus } from '../login/State/Login.Selector';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  loginthroughApi: boolean;
  showChangePassword: boolean;

  constructor( public store:Store<LoginAppState>) { }

  ngOnInit() {
    if(localStorage.getItem('IsLoginThroughApi')){
      this.loginthroughApi=true
    }
    this.store.select(GetLoginstatus).subscribe(
      data => {
        if(data){
          this.showChangePassword=data;
        }
      }
    )

  }

}
