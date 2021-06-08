import { Injectable } from '@angular/core';

import { AssetHandlerService } from '../../data-transfers/windows/asset-handler.service';
import { LayerListService } from '../layer-list.service';
import { MatDialogGeneratorService } from '../../shared/mat-dialog-generator.service';
import { SelectedToolService } from '../selected-tool.service';

import { IToolOnMouseDoubleClicked } from 'src/app/interfaces/tools/i-tool-on-mouse-double-clicked';
import { IToolOnDraw } from 'src/app/interfaces/tools/i-tool-on-draw';
import { LayerDrawEntity } from '../../entities/main/layer/layer-draw-entity';
import { MouseDataEntity } from '../../entities/main/mouse-data-entity';
import { ParagraphsComponent } from 'src/app/shared/components/paragraphs/paragraphs.component';
import { RandomGenerator } from 'src/app/utilities/random-generator';
import { PlaceImageDataEntity } from '../../entities/main/tools/place-image-data-entity';

@Injectable({
  providedIn: 'root'
})
export class PlaceImageToolService implements IToolOnDraw, IToolOnMouseDoubleClicked {

  constructor(
      private selectedToolService: SelectedToolService,
      private matDialogGeneratorService: MatDialogGeneratorService,
      private layerListService: LayerListService,
      private assetHandlerService: AssetHandlerService) { 

  }

  public onDraw(
    g: any, gRef: any, ctx: CanvasRenderingContext2D, size: number, scale: number, drawForSave: boolean, toolData: LayerDrawEntity
  ): void {
    const data: PlaceImageDataEntity = toolData.details.placeImageTool;

    const img: any = this.assetHandlerService.getImageByName(data?.draw);

    if (!img) return;

    gRef.colorMode(gRef.HSB);
    gRef.tint(data.h, data.s, data.b, 255);

    gRef.image(img, 0, 0, img?.width*data.size*scale, img?.height*data.size*scale)

    gRef.colorMode(gRef.RGB);
  }

  public onDrawControlPoint(
    g: any, gRef: any, ctx: CanvasRenderingContext2D, size: number, scale: number, drawForSave: boolean, toolData: LayerDrawEntity
  ): void { }

  public onMouseDoubleClicked(obj: MouseDataEntity, toolData: LayerDrawEntity): void {
    const img = this.assetHandlerService.getSelectedName();

    if (!img) {
      return this.matDialogGeneratorService.openActionDialog<ParagraphsComponent>(
        'Warning', 'warning', '', 
        () => { }, 
        ParagraphsComponent, ['There is no loaded image asset!']
      );
    }

    if (!toolData.tool) {
      toolData.tool = 'placeImageTool';
      toolData.toolName = 'Image asset';
    } else {
      this.layerListService.add('Image asset ' + RandomGenerator.idString(6), 'layer');
      toolData = this.layerListService.getSelectedLayer()?.drawData;
      toolData.tool = 'placeImageTool';
      toolData.toolName = 'Image asset';
    }

    if (!toolData) {
      return this.matDialogGeneratorService.openActionDialog<ParagraphsComponent>(
        'Warning', 'warning', '', 
        () => { }, 
        ParagraphsComponent, ['There was an error with the asset!']
      );
    }

    toolData.x = obj.x / obj.scale;
    toolData.y = obj.y / obj.scale;

    toolData.details.placeImageTool = {
      draw: img,
      h: 1,
      s: 1,
      b: 255,
      size: 1,
    }

    this.selectedToolService.selectTool('moveTool');
  }

}
