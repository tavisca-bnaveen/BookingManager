import {Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { inherits } from 'util';
@Directive({
    selector: '[BackColorHover]'
})

export class ViewColorDirective{

    @Input('BackColorHover')
    BackColorHover:string;

    constructor(private element:ElementRef, private render : Renderer2){}

    @HostListener('mouseenter')
    mouseenter():void{
        
        this.render.setStyle(this.element.nativeElement,'background-color',this.BackColorHover);
        this.render.setStyle(this.element.nativeElement,'color','white');
    }

    @HostListener('mouseleave')
    mouseleave():void{
        this.render.setStyle(this.element.nativeElement,'background-color',null);
        this.render.setStyle(this.element.nativeElement,'color',null);
    }

}