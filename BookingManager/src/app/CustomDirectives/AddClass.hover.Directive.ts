import {Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
@Directive({
    selector:'[AddClassHover]'
})
export class AddClassDirective{

    @Input('AddClassHover')
    AddClassHover:string

    constructor(private render:Renderer2, private element :ElementRef){}

    @HostListener('mouseenter')
    mouseenter(){
        this.render.addClass(this.element.nativeElement,this.AddClassHover);
    }
    @HostListener('mouseleave')
    mouseleave(){
        this.render.removeClass(this.element.nativeElement,this.AddClassHover);
    }

    
}