import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { ViewColorDirective } from 'src/app/CustomDirectives/View.Directive.Color';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PopupComponent],
  exports:[PopupComponent]
})
export class PopupModule { }