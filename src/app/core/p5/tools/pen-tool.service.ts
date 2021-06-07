import { Injectable } from '@angular/core';

import { LayerDrawEntity } from '../../entities/main/layer/layer-draw-entity';
import { IToolOnDraw } from 'src/app/interfaces/tools/i-tool-on-draw';

@Injectable({
  providedIn: 'root'
})
export class PenToolService implements IToolOnDraw {

  constructor() { }

  public onDraw(
    g: any, gRef: any, ctx: CanvasRenderingContext2D, size: number, scale: number, drawForSave: boolean, toolData: LayerDrawEntity
  ): void {
    
  }

}
