import { Injectable } from '@angular/core';

import { IToolOnMouseDoubleClicked } from 'src/app/interfaces/tools/i-tool-on-mouse-double-clicked';
import { IToolOnMouseDraggedLeft } from 'src/app/interfaces/tools/i-tool-on-mouse-dragged-left';

import { LayerDrawEntity } from '../../entities/main/layer/layer-draw-entity';
import { MouseDataEntity } from '../../entities/main/mouse-data-entity';
import { P5DrawSemaphoreService } from '../p5-draw-semaphore.service';

@Injectable({
  providedIn: 'root'
})
export class MoveToolService implements IToolOnMouseDoubleClicked, IToolOnMouseDraggedLeft {

  private tick: number;

  constructor(private p5DrawSemaphoreService: P5DrawSemaphoreService) { 
    this.tick = 0;
  }

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

    this.tick = this.tick + 1;

    if (this.tick >= 15) {
      this.tick = 0;
      
      this.p5DrawSemaphoreService.draw();
    }
  }

}
