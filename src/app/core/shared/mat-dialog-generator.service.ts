import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { MainDialogComponent } from 'src/app/shared/components/main-dialog/main-dialog.component';
import { MainDialogEntity } from '../entities/shared/main-dialog-entity';
import { IDialogComponentView } from 'src/app/interfaces/i-dialog-component-view';

@Injectable({
  providedIn: 'root'
})
export class MatDialogGeneratorService {

  constructor(public dialog: MatDialog) { }

  public openDialog<T, D>(component: ComponentType<T>, dataContent: D): void {
    const dialogRef: MatDialogRef<T, any> = this.dialog.open(component, {
      data: dataContent,
    });
  }

  public openActionDialog<T extends IDialogComponentView<any, any>>(
    name: string, 
    icon: string, 
    action: string,
    onAction: Function,
    component: Type<T>,
    componentData: any
  ): void {
    this.openDialog<MainDialogComponent, MainDialogEntity<T>>(MainDialogComponent, {
      name: name, icon: icon, action: action, onAction: onAction, componentView: component, componentData: componentData
    });
  }

}
