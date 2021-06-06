import { Component, Type, Input, ViewChild, AfterViewInit, OnDestroy, ComponentRef } from '@angular/core';

import { CurrentProjectService } from 'src/app/core/data-transfers/current-project.service';
import { ComponentFactoryService } from 'src/app/core/utilities/component-factory.service';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';

@Component({
  selector: 'app-dynamic-template',
  templateUrl: './dynamic-template.component.html',
  styleUrls: ['./dynamic-template.component.scss']
})
export class DynamicTemplateComponent implements AfterViewInit, OnDestroy {

  private tempComponent: Type<any> | null;
  private isViewLoaded: boolean;
  private instance: ComponentRef<any>;

  @Input() public set component(data: Type<any> | null) {
    this.tempComponent = data;

    if (this.isViewLoaded) this.insertComponent();
  }

  @ViewChild('mainContentInsert', {static: false}) private template: DynamicComponentDirective;

  constructor(public componentFactoryService: ComponentFactoryService) { 
    this.isViewLoaded = false;
  }

  public ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.isViewLoaded = true;

      this.insertComponent();
    });
  }

  public ngOnDestroy(): void {
    this.componentFactoryService.destroyComponent(this.instance);
  }

  private insertComponent(): void {
    this.componentFactoryService.destroyComponent(this.instance);
    
    if (this.tempComponent) {
      this.instance = this.componentFactoryService.createComponent(this.tempComponent, this.template);
    }
  }

}
