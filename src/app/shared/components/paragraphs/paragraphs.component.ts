import { Component, Input } from '@angular/core';

import { IDialogComponentView } from 'src/app/interfaces/i-dialog-component-view';

@Component({
  selector: 'app-paragraphs',
  templateUrl: './paragraphs.component.html',
  styleUrls: ['./paragraphs.component.scss']
})
export class ParagraphsComponent implements IDialogComponentView<Array<string>, void>  {

  @Input() public data: Array<string>

  constructor() { }

  public disable(): boolean {
    return false;
  }

  public setData(data: Array<string>): void {
    this.data = data;
  }

  public getData(): void {
    return null;
  }

}
