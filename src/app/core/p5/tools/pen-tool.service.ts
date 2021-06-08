import { Injectable } from '@angular/core';

import { IToolOnMouseClicked } from 'src/app/interfaces/tools/i-tool-on-mouse-clicked';
import { IToolOnMousePressedLeft } from 'src/app/interfaces/tools/i-tool-on-mouse-pressed-left';
import { IToolOnDraw } from 'src/app/interfaces/tools/i-tool-on-draw';
import { LayerDrawEntity } from '../../entities/main/layer/layer-draw-entity';
import { MouseDataEntity } from '../../entities/main/mouse-data-entity';

@Injectable({
  providedIn: 'root'
})
export class PenToolService implements IToolOnDraw, IToolOnMouseClicked {

  constructor() { }

  public onDraw(
    g: any, gRef: any, ctx: CanvasRenderingContext2D, size: number, scale: number, drawForSave: boolean, toolData: LayerDrawEntity
  ): void {
    
  }

  onDrawControlPoint(
    g: any, gRef: any, ctx: CanvasRenderingContext2D, size: number, scale: number, drawForSave: boolean, toolData: LayerDrawEntity
  ): void {
    
  }

  public onMouseClicked(obj: MouseDataEntity, toolData: LayerDrawEntity): void {

  }

  public onMousePressedLeft(obj: MouseDataEntity, toolData: LayerDrawEntity): void {

  }

}
