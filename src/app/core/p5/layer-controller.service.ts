import { IToolOnDrawControlPoints } from './../../interfaces/tools/i-tool-on-draw-control-points';
import { Injectable } from '@angular/core';
import { LayerListService } from './layer-list.service';
import { tryCatch } from 'src/app/utilities/wrappers';
import { MouseDataEntity } from './../entities/main/mouse-data-entity';
import { LayerDataEntity } from '../entities/main/layer/layer-data-entity';
import { ToolHandlerService } from './tool-handler.service';
import { SelectedToolService } from './selected-tool.service';

import { environment } from 'src/environments/environment';

import { IToolOnDraw } from 'src/app/interfaces/tools/i-tool-on-draw';
import { IToolOnMouseMove } from 'src/app/interfaces/tools/i-tool-on-mouse-move';
import { IToolOnMouseClicked } from 'src/app/interfaces/tools/i-tool-on-mouse-clicked';
import { IToolOnMouseDoubleClicked } from 'src/app/interfaces/tools/i-tool-on-mouse-double-clicked';
import { IToolOnMouseWheel } from 'src/app/interfaces/tools/i-tool-on-mouse-wheel';
import { IToolOnMousePressedLeft } from 'src/app/interfaces/tools/i-tool-on-mouse-pressed-left';
import { IToolOnMouseDraggedLeft } from 'src/app/interfaces/tools/i-tool-on-mouse-dragged-left';
import { IToolOnMouseReleasedLeft } from 'src/app/interfaces/tools/i-tool-on-mouse-released-left';
import { IToolOnKeyPressed } from 'src/app/interfaces/tools/i-tool-on-key-pressed';

@Injectable({
  providedIn: 'root'
})
export class LayerControllerService {

  constructor(
    private layerListService: LayerListService, 
    private selectedToolService: SelectedToolService,
    private toolHandlerService: ToolHandlerService) { }

  private onError = (err) => {
    if (!environment.production) {
      console.error(err);
    }
  }

  public onDraw = tryCatch((
      sketch: any, 
      graphics: any, 
      graphicsRefresh: any, 
      ctx: CanvasRenderingContext2D, 
      size: number, scale: number,
      drawForSave: boolean
    ): void => {
    graphics.clear();
    graphics.background(0, 0, 0, 0);
    graphics.colorMode(graphics.RGB);

    graphicsRefresh.clear();
    graphicsRefresh.background(0, 0, 0, 0);

    graphicsRefresh.fill(250, 25, 25, 255);
    graphicsRefresh.strokeWeight(0);
    graphicsRefresh.beginShape();
    graphicsRefresh.vertex(0.5*size, 0.95*size);
    graphicsRefresh.bezierVertex(0.35*size, 0.85*size, 0.05*size, 0.4*size, 0.05*size, 0.285*size);
    graphicsRefresh.bezierVertex(0.05*size, 0.1*size, 0.375*size, -0.075*size, 0.5*size, 0.2*size);
    graphicsRefresh.bezierVertex(0.625*size, -0.075*size, 0.95*size, 0.1*size, 0.95*size, 0.285*size);
    graphicsRefresh.bezierVertex(0.95*size, 0.4*size, 0.65*size, 0.85*size, 0.5*size, 0.95*size);
    graphicsRefresh.endShape();

    graphics.image(graphicsRefresh, 0, 0, size, size);

    this.layerListService.iterate((item: LayerDataEntity, selected: boolean) => {
      graphics.colorMode(graphics.RGB);

      graphicsRefresh.clear();
      graphicsRefresh.background(0, 0, 0, 0);
      graphicsRefresh.colorMode(graphicsRefresh.RGB);

      if (!item.show) return;

      graphicsRefresh.translate(item.drawData.x*scale, item.drawData.y*scale);

      const event: any = this.toolHandlerService.getTool<IToolOnDraw>(item.drawData.tool);

      if (typeof(event?.onDraw) === 'function') {
        event.onDraw(
          graphics, graphicsRefresh, 
          ctx, size, scale, drawForSave, item.drawData
        );
      }

      if (!drawForSave && selected) {
        if (typeof(event?.onDrawControlPoints) === 'function') {
          event.onDrawControlPoints(
            graphics, graphicsRefresh, 
            ctx, size, scale, drawForSave, item.drawData
          );
        }
      }

      graphics.colorMode(graphics.RGB);
      graphics.tint(255, item.drawData.transparency);
      graphics.image(graphicsRefresh, 0, 0, size, size);
      graphics.tint(255, 255);

      graphicsRefresh.reset();
      graphics.reset();
    });

    sketch.image(graphics, 0, 0, size, size);
  }, this.onError);



  public onMouseMove = tryCatch((data: MouseDataEntity): void => {
    const event: IToolOnMouseMove = this.toolHandlerService.getTool<IToolOnMouseMove>(this.selectedToolService.selected);

    if (typeof(event?.onMouseMove) !== 'function') return;

    event.onMouseMove(data, this.layerListService.getSelectedLayer()?.drawData);
  }, this.onError);

  public onMouseClicked = tryCatch((data: MouseDataEntity): void => {
    const event: IToolOnMouseClicked = this.toolHandlerService.getTool<IToolOnMouseClicked>(this.selectedToolService.selected);

    if (typeof(event?.onMouseClicked) !== 'function') return;

    event.onMouseClicked(data, this.layerListService.getSelectedLayer()?.drawData);
  }, this.onError);

  public onMouseDoubleClicked = tryCatch((data: MouseDataEntity): void => {
    const event: IToolOnMouseDoubleClicked = this.toolHandlerService.getTool<IToolOnMouseDoubleClicked>(this.selectedToolService.selected);

    if (typeof(event?.onMouseDoubleClicked) !== 'function') return;

    event.onMouseDoubleClicked(data, this.layerListService.getSelectedLayer()?.drawData);
  }, this.onError);



  public onMouseWheel = tryCatch((delta: number): void => {
    const event: IToolOnMouseWheel = this.toolHandlerService.getTool<IToolOnMouseWheel>(this.selectedToolService.selected);

    if (typeof(event?.onMouseWheel) !== 'function') return;

    event.onMouseWheel(delta, this.layerListService.getSelectedLayer()?.drawData);
  }, this.onError);



  public onMousePressedLeft = tryCatch((data: MouseDataEntity): void => {
    const event: IToolOnMousePressedLeft = this.toolHandlerService.getTool<IToolOnMousePressedLeft>(this.selectedToolService.selected);

    if (typeof(event?.onMousePressedLeft) !== 'function') return;

    event.onMousePressedLeft(data, this.layerListService.getSelectedLayer()?.drawData);
  }, this.onError);

  public onMousePressedRight = tryCatch((data: MouseDataEntity): void => {
    
  }, this.onError);

  public onMousePressedCenter = tryCatch((data: MouseDataEntity): void => {
    
  }, this.onError);



  public onMouseDraggedLeft = tryCatch((data: MouseDataEntity): void => {
    const event: IToolOnMouseDraggedLeft = this.toolHandlerService.getTool<IToolOnMouseDraggedLeft>(this.selectedToolService.selected);

    if (typeof(event?.onMouseDraggedLeft) !== 'function') return;

    event.onMouseDraggedLeft(data, this.layerListService.getSelectedLayer()?.drawData);
  }, this.onError);

  public onMouseDraggedRight = tryCatch((data: MouseDataEntity): void => {
    
  }, this.onError);

  public onMouseDraggedCenter = tryCatch((data: MouseDataEntity): void => {
    
  }, this.onError);



  public onMouseReleasedLeft = tryCatch((data: MouseDataEntity): void => {
    const event: IToolOnMouseReleasedLeft = this.toolHandlerService.getTool<IToolOnMouseReleasedLeft>(this.selectedToolService.selected);

    if (typeof(event?.onMouseReleasedLeft) !== 'function') return;

    event.onMouseReleasedLeft(data, this.layerListService.getSelectedLayer()?.drawData);
  }, this.onError);

  public onMouseReleasedRight = tryCatch((data: MouseDataEntity): void => {
    
  }, this.onError);

  public onMouseReleasedCenter = tryCatch((data: MouseDataEntity): void => {
    
  }, this.onError);



  public onKeyPressed = tryCatch((key: string, code: number): void => {
    const event: IToolOnKeyPressed = this.toolHandlerService.getTool<IToolOnKeyPressed>(this.selectedToolService.selected);

    if (typeof(event?.onKeyPressed) !== 'function') return;

    event.onKeyPressed(key, code);
  }, this.onError);

  public onKeyReleased = tryCatch((key: string, code: number): void => {
    
  }, this.onError);

}
