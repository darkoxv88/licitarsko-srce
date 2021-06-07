import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LicitarskoSrceComponent } from './licitarsko-srce.component';

import { ColorPickerToolComponent } from './tool-list/color-picker-tool/color-picker-tool.component';
import { AboutComponent } from './about/About.component';
import { ControlWindowsComponent } from './control-windows/control-windows.component';
import { CanvasContainerComponent } from './canvas-container/canvas-container.component';
import { PaletteSettingsComponent } from './control-windows/palette-settings/palette-settings.component';
import { ToolListComponent } from './tool-list/tool-list.component';
import { LayersWindowComponent } from './control-windows/layers-window/layers-window.component';
import { AssetImporterComponent } from './asset-importer/asset-importer.component';
import { AssetWindowComponent } from './control-windows/asset-window/asset-window.component';
import { LayersWindowNewLayerComponent } from './control-windows/layers-window/layers-window-new-layer/layers-window-new-layer.component';
import { SelectedLayerWindowComponent } from './control-windows/selected-layer-window/selected-layer-window.component';
import { ToolSettingsHolderComponent } from './control-windows/tool-settings-holder/tool-settings-holder.component';
import { MoveToolComponent } from './tool-list/move-tool/move-tool.component';
import { PencileToolComponent } from './tool-list/pencile-tool/pencile-tool.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AboutComponent,
    CanvasContainerComponent,
    ControlWindowsComponent,
    LicitarskoSrceComponent,
    PaletteSettingsComponent,
    ToolListComponent,
    LayersWindowComponent,
    ColorPickerToolComponent,
    AssetImporterComponent,
    AssetWindowComponent,
    LayersWindowNewLayerComponent,
    SelectedLayerWindowComponent,
    ToolSettingsHolderComponent,
    MoveToolComponent,
    PencileToolComponent,
  ],
  entryComponents: [ 
    AboutComponent,
    CanvasContainerComponent,
    ControlWindowsComponent,
    LicitarskoSrceComponent,
    PaletteSettingsComponent,
    ToolListComponent,
    LayersWindowComponent,
    ColorPickerToolComponent,
    AssetImporterComponent,
    AssetWindowComponent,
    LayersWindowNewLayerComponent,
    SelectedLayerWindowComponent,
    ToolSettingsHolderComponent,
    MoveToolComponent,
    PencileToolComponent,
  ],
  exports: [ ],
})
export class LicitarskoSrceModule { }
