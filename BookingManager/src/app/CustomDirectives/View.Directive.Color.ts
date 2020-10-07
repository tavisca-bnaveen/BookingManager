import {Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { inherits } from 'util';
@Directive({
    selector: '[BackColor]'
})

export class ViewColorDirective{

    @Input('BackColor')
    BackColor:string;

    constructor(private element:ElementRef, private render : Renderer2){}

    @HostListener('mouseenter')
    mouseenter():void{
        
        this.render.setStyle(this.element.nativeElement,'background-color',this.BackColor);
    }

    @HostListener('mouseleave')
    mouseleave():void{
        this.render.setStyle(this.element.nativeElement,'background-color',null);
    }

}