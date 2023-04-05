import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUserMenu]'
})
export class UserMenuDirective {
  @HostListener('mouseleave') onMouseLeave(){
    this.changePosition(-300)

  }
  constructor(private el: ElementRef, private render: Renderer2) { }

  private changePosition(position: number){
    console.log(this.el.nativeElement)
    //this.el.nativeElement.style.visi = position+'px';
  }

}
