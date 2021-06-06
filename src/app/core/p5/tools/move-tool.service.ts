import { Injectable } from '@angular/core';

import { IToolOnMouseDoubleClicked } from 'src/app/interfaces/tools/i-tool-on-mouse-double-clicked';
import { IToolOnMouseDraggedLeft } from 'src/app/interfaces/tools/i-tool-on-mouse-dragged-left';

import { LayerDrawEntity } from '../../entities/main/layer/layer-draw-entity';
import { MouseDataEntity } from '../../entities/main/mouse-data-entity';

import { SelectedToolService } from '../selected-tool.service';

@Injectable({
  providedIn: 'root'
})
export class MoveToolService implements IToolOnMouseDoubleClicked, IToolOnMouseDraggedLeft {

  constructor() { }

  public onMouseDoubleClicked(obj: MouseDataEntity, toolData: LayerDrawEntity): void {
    if (!toolData) return;

    if (obj.mInView) {
      toolData.x = 0;
      toolData.y = 0;
    }
  }

  public onMouseDraggedLeft(obj: MouseDataEntity, toolData: LayerDrawEntity): void {
    if (!toolData) return;

    toolData.x = toolData.x + (obj.mx / obj.scale);
    toolData.y = toolData.y + (obj.my / obj.scale);
  }

}
