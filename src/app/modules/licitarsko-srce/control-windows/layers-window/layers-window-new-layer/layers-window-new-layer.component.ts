import { Component, OnInit } from '@angular/core';
import { IDialogComponentView } from 'src/app/interfaces/i-dialog-component-view';

import { CreateLayerEntity } from 'src/app/core/entities/main/layer/create-layer-entity';

@Component({
  selector: 'app-layers-window-new-layer',
  templateUrl: './layers-window-new-layer.component.html',
  styleUrls: ['./layers-window-new-layer.component.scss']
})
export class LayersWindowNewLayerComponent implements OnInit, IDialogComponentView<null, CreateLayerEntity> {

  public obj: CreateLayerEntity;

  constructor() {
    this.obj = new CreateLayerEntity();
    this.obj.name = '';
    this.obj.type = 'layer';
  }

  ngOnInit() {
  }

  public disable(): boolean {
    if (!this.obj.name) return true;

    return false;
  }

  public setData(data: null): void {

  }

  public getData(): CreateLayerEntity {
    return this.obj;
  }

}
