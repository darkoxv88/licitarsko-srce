import { Injectable } from '@angular/core';

import { IToolOnDraw } from 'src/app/interfaces/tools/i-tool-on-draw';
import { LayerDrawEntity } from '../../entities/main/layer/layer-draw-entity';

@Injectable({
  providedIn: 'root'
})
export class TestToolService implements IToolOnDraw {

  private testId: string;

  constructor() { 
    this.testId = 'Hello world';
  }

  public onDraw(
    g: any, gRef: any, ctx: CanvasRenderingContext2D, size: number, scale: number, drawForSave: boolean, toolData: LayerDrawEntity
  ): void {
    
  }

  onDrawControlPoint(
    g: any, gRef: any, ctx: CanvasRenderingContext2D, size: number, scale: number, drawForSave: boolean, toolData: LayerDrawEntity
  ): void {
    
  }

}
