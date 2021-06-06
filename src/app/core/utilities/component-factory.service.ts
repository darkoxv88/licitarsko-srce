import {  ComponentFactoryResolver, Injectable, ComponentRef, ComponentFactory, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentFactoryService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public createComponent<T>(componentInstance: Type<T>, viewContainer: any): ComponentRef<T> | undefined {
    if (!componentInstance) return undefined;
    
    const componentFactory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory<T>(componentInstance);
    
    const viewContainerRef: any = viewContainer.viewContainerRef;

    viewContainerRef.clear();

    return viewContainerRef.createComponent(componentFactory);
  }

  public destroyComponent(instance: ComponentRef<any>): void {
    if (instance) {
      instance?.destroy();
    }
  }
}
