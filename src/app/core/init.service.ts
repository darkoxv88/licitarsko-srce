import { Injectable } from '@angular/core';

import { LoadProjectService } from './project/load-project.service';
import { SaveProjectService } from './project/save-project.service';
import { P5Service } from './p5/p5.service';
import { CurrentProjectService } from './data-transfers/current-project.service';
import { WindowControllerService } from './data-transfers/window-controller.service';
import { AssetHandlerService } from './data-transfers/windows/asset-handler.service';
import { PaletteSettingsService } from './data-transfers/windows/palette-settings.service';
import { LayerControllerService } from './p5/layer-controller.service';
import { LayerListService } from './p5/layer-list.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  private _title: string;

  public get title(): string {
    return this._title
  }

  constructor(
      private loadProjectService: LoadProjectService,
      private saveProjectService: SaveProjectService,
      private p5Service: P5Service,
      private currentProjectService: CurrentProjectService,
      private windowControllerService: WindowControllerService,
      private assetHandlerService: AssetHandlerService,
      private paletteSettingsService: PaletteSettingsService,
      private layerControllerService: LayerControllerService,
      private layerListService: LayerListService) { 
    this._title = 'Licitarsko srce';
  }

}
