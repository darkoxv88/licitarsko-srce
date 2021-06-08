import { Injectable } from '@angular/core';

import { LayerDrawEntity } from '../../entities/main/layer/layer-draw-entity';

import { IToolOnDraw } from './../../../interfaces/tools/i-tool-on-draw';
import { IToolOnMousePressedLeft } from 'src/app/interfaces/tools/i-tool-on-mouse-pressed-left';
import { IToolOnMouseDraggedLeft } from 'src/app/interfaces/tools/i-tool-on-mouse-dragged-left';
import { MouseDataEntity } from '../../entities/main/mouse-data-entity';

import { RgbaColorEntity } from '../../entities/other/rgba-color-entity';
import { PaletteSettingsService } from '../../data-transfers/windows/palette-settings.service';
import { PencileDrawDataEntity } from '../../entities/main/tools/pencile-draw-data-entity';
import { P5DrawSemaphoreService } from '../p5-draw-semaphore.service';

@Injectable({
  providedIn: 'root'
})
export class PencileToolService implements IToolOnDraw, IToolOnMousePressedLeft, IToolOnMouseDraggedLeft {

  private tick: number;

  constructor(private paletteSettingsService: PaletteSettingsService, private p5DrawSemaphoreService: P5DrawSemaphoreService) { 
    this.tick = 0;
  }

  public onDraw(
    g: any, gRef: any, ctx: CanvasRenderingContext2D, size: number, scale: number, drawForSave: boolean, toolData: LayerDrawEntity
  ): void {
    if (!toolData.details['list']) return;

    for (let i = 0; i < toolData.details['list'].length; i++) {
      const d: PencileDrawDataEntity = toolData.details['list'][i];

      gRef.stroke(d.r, d.g, d.b); 
      gRef.strokeWeight(d.size*scale);
      gRef.point(d.x * scale, d.y * scale);
    }
  }

  onDrawControlPoint(
    g: any, gRef: any, ctx: CanvasRenderingContext2D, size: number, scale: number, drawForSave: boolean, toolData: LayerDrawEntity
  ): void { }

  private _canAction(toolData: LayerDrawEntity): boolean {
    if (!toolData.tool) {
      toolData.tool = 'pencileTool';
      toolData.toolName = 'Pencile tool';
    }

    if (toolData.tool !== 'pencileTool') {
      return false;
    }

    return true;
  }

  private _sharedAction(obj: MouseDataEntity, toolData: LayerDrawEntity): void {
    if (this._canAction(toolData) !== true) return;
    
    if (!toolData.details['list']) toolData.details['list'] = new Array<PencileDrawDataEntity>();

    if (obj.mInView == false) return;

    const color: RgbaColorEntity = this.paletteSettingsService.fillRGBA;

    toolData.details['list'].push({
      x: ((obj.x - toolData.x) / obj.scale),
      y: ((obj.y - toolData.y) / obj.scale),
      size: 2,
      r: color.r,
      g: color.g,
      b: color.b,
    });
  }

  public onMousePressedLeft(obj: MouseDataEntity, toolData: LayerDrawEntity): void {
    this._sharedAction(obj, toolData);
  }; 

  public onMouseDraggedLeft(obj: MouseDataEntity, toolData: LayerDrawEntity): void {
    this._sharedAction(obj, toolData);

    this.tick = this.tick + 1;

    if (this.tick >= 20) {
      this.tick = 0;
      
      this.p5DrawSemaphoreService.draw();
    }
  }; 

}
