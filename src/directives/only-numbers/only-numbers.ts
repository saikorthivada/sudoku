import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[only-numbers]' // Attribute selector
})
export class OnlyNumbersDirective {

  @HostListener('document:keydown', ['$event']) keyup(event: KeyboardEvent) {    
    if (this.getIsValidKey(event.keyCode)) {
      event.preventDefault();
    }
  }
  constructor() {
  }

  getIsValidKey(key) {
    if (key !== 8 && key !== 9 && key !== 13 && (key <= 48 || key > 57)) {
      return true
    } else {
      return false;
    }
  }
}
