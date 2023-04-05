import { Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appKeypressed]'
})
export class KeypressedDirective {

  constructor(private elRef: ElementRef<HTMLElement>) { 
    elRef.nativeElement.addEventListener('keypress',e=>alert(e));

  }

}
