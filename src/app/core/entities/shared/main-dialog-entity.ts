import { IDialogComponentView } from "src/app/interfaces/i-dialog-component-view";
import { Type } from "@angular/core";

export class MainDialogEntity<T extends IDialogComponentView<any, any>> {
  public name: string;
  public icon: string;
  public action: string;
  public onAction: Function;
  public componentView: Type<T>;
  public componentData: any;
}
