import { Injectable } from '@angular/core';

import { TestToolService } from './tools/test-tool.service';

import { ColorPickerToolService } from './tools/color-picker-tool.service';
import { ColorPickerToolComponent } from './../../modules/licitarsko-srce/tool-list/color-picker-tool/color-picker-tool.component';
import { MoveToolService } from './tools/move-tool.service';
import { MoveToolComponent } from './../../modules/licitarsko-srce/tool-list/move-tool/move-tool.component';
import { PencileToolService } from './tools/pencil-tool.service';
import { PencileToolComponent } from 'src/app/modules/licitarsko-srce/tool-list/pencile-tool/pencile-tool.component';
import { PlaceImageToolService } from './tools/place-image-tool.service';

@Injectable({
  providedIn: 'root'
})
export class ToolListService {

  private list: any;

  constructor(
      testToolService: TestToolService,
      colorPickerToolService: ColorPickerToolService,
      moveToolService: MoveToolService,
      pencileToolService: PencileToolService,
      placeImageToolService: PlaceImageToolService,) { 
    this.list = {
      'testTool': { tool: testToolService, component: null, reqLayer: false },
      'colorPickerTool': { tool: colorPickerToolService, component: ColorPickerToolComponent, reqLayer: false },
      'moveTool': { tool: moveToolService, component: MoveToolComponent, reqLayer: false },
      'pencileTool': { tool: pencileToolService, component: PencileToolComponent, reqLayer: true },
      'placeImageTool': { tool: placeImageToolService, component: null, reqLayer: true },
    };
  }

  public getTool(name: string): any {
    return this.list[name];
  }

}
