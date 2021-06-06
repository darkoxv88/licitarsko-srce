import { Directive, ElementRef, AfterViewInit,  Input } from '@angular/core';

@Directive({
  selector: '[appInitStyle]',
  exportAs: 'appInitStyle'
})
export class InitStyleDirective {

  @Input() public setStyle: string = '';

  constructor(private ref: ElementRef) { }

  public ngAfterViewInit(): void {
    if (this.setStyle) this.ref.nativeElement.style = this.setStyle;
  }

}
