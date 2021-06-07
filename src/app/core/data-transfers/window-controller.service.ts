import { Injectable } from '@angular/core';

import { ControlWindowRefEntity } from 'src/app/core/entities/shared/control-window-ref-entity';
import { PaletteSettingsComponent } from 'src/app/modules/licitarsko-srce/control-windows/palette-settings/palette-settings.component';
import { LayersWindowComponent } from 'src/app/modules/licitarsko-srce/control-windows/layers-window/layers-window.component';
import { AssetWindowComponent } from 'src/app/modules/licitarsko-srce/control-windows/asset-window/asset-window.component';
import { ToolSettingsHolderComponent } from 'src/app/modules/licitarsko-srce/control-windows/tool-settings-holder/tool-settings-holder.component';
import { SelectedLayerWindowComponent } from 'src/app/modules/licitarsko-srce/control-windows/selected-layer-window/selected-layer-window.component';

@Injectable({
  providedIn: 'root'
})
export class WindowControllerService {

  public list: Array<ControlWindowRefEntity>;

  constructor() { 
    this.populate();
  }

  public populate(): void {
    this.list = [
      { name: 'Tool', title: 'Tool', expanded: true, show: true, component: ToolSettingsHolderComponent, pos: 'translate3d(0px, 49px, 0px);' },
      { name: 'Layers', title: 'Layers', expanded: true, show: true, component: LayersWindowComponent, pos: 'translate3d(0px, 205px, 0px);' },
      { name: 'Selected layer', title: 'Selected layer', expanded: true, show: false, component: SelectedLayerWindowComponent, pos: '' },
      { name: 'Palette', title: 'Palette', expanded: true, show: false, component: PaletteSettingsComponent, pos: '' },
      { name: 'Assets', title: 'Assets', expanded: true, show: false, component: AssetWindowComponent, pos: '' },
    ];
  }

}
