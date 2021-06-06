import { Type } from '@angular/core';

export class ControlWindowRefEntity {
  public name: string;
  public title: string;
  public expanded: boolean
  public show: boolean;
  public component: Type<any> | null
  public pos: string;
}
