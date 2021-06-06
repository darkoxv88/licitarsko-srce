import { Component, OnInit, Inject, ViewChild, AfterViewInit, OnDestroy, ComponentRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainDialogEntity } from 'src/app/core/entities/shared/main-dialog-entity';
import { ComponentFactoryService } from 'src/app/core/utilities/component-factory.service';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';

import { IDialogComponentView } from 'src/app/interfaces/i-dialog-component-view';

@Component({
  selector: 'app-main-dialog',
  templateUrl: './main-dialog.component.html',
  styleUrls: ['./main-dialog.component.scss']
})
export class MainDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(DynamicComponentDirective, {static: false}) private template: DynamicComponentDirective;
  private view: ComponentRef<IDialogComponentView<any, any>>

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: MainDialogEntity<any>,
      private componentFactoryService: ComponentFactoryService,
      private dialogRef: MatDialogRef<MainDialogComponent>) {
    this.dialogRef.disableClose = true;
  }

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.view = this.componentFactoryService.createComponent<any>(this.data?.componentView , this.template);
      this.view.instance?.setData(this.data.componentData);
    }, 5);
  }

  public ngOnDestroy(): void {
    if (this.view) {
      this.componentFactoryService.destroyComponent(this.view);
    }
  }

  public disableAction(): boolean {
    return !!this.view?.instance?.disable();
  }

  public showAction(): boolean {
    if (typeof(this.data?.action) !== 'string') {
      return false;
    }
    if (!this.data.action) {
      return false;
    }

    return true;
  }

  private close = (): void => {
    this.dialogRef?.close();
  }

  public onAction(): void {
    try {
      this.data.onAction(this.view?.instance?.getData(), this.close);
    } catch (err) {
      console.error(err);
    }
  }

}
