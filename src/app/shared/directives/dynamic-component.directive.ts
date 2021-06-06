import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicComponent]',
  exportAs: 'appDynamicComponent'
})
export class DynamicComponentDirective {

  constructor(private viewContainerRef: ViewContainerRef) { }

}
