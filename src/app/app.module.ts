import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { MaterialModule } from './material.module';

import { SharedModule } from './shared/shared.module';
import { LicitarskoSrceModule } from './modules/licitarsko-srce/licitarsko-srce.module';

import { AppThemeService } from './app-theme.service';

import { CookieHandlerService } from './core/utilities/cookie-handler.service';
import { ComponentFactoryService } from './core/utilities/component-factory.service';
import { MatDialogGeneratorService } from './core/shared/mat-dialog-generator.service';
import { MatSnackBarService } from './core/shared/mat-snack-bar.service';
import { NgIfExtensionsService } from './core/utilities/ng-if-extensions.service';
import { P5Service } from './core/p5/p5.service';
import { LayerControllerService } from './core/p5/layer-controller.service';
import { LayerListService } from './core/p5/layer-list.service';
import { AssetHandlerService } from './core/data-transfers/windows/asset-handler.service';
import { SaveProjectService } from './core/project/save-project.service';
import { LoadProjectService } from './core/project/load-project.service';
import { WindowControllerService } from './core/data-transfers/window-controller.service';
import { CurrentProjectService } from './core/data-transfers/current-project.service';
import { P5DrawSemaphoreService } from './core/p5/p5-draw-semaphore.service';
import { InitService } from './core/init.service';
import { ToolListService } from './core/p5/tool-list.service';
import { ToolHandlerService } from './core/p5/tool-handler.service';
import { SelectedToolService } from './core/p5/selected-tool.service';
import { TestToolService } from './core/p5/tools/test-tool.service';
import { ColorPickerToolService } from './core/p5/tools/color-picker-tool.service';
import { MoveToolService } from './core/p5/tools/move-tool.service';
import { PencileToolService } from './core/p5/tools/pencil-tool.service';
import { PlaceImageToolService } from './core/p5/tools/place-image-tool.service';
import { PenToolService } from './core/p5/tools/pen-tool.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LicitarskoSrceModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    InitService,
    AppThemeService,
    ComponentFactoryService,
    CookieService,
    CookieHandlerService,
    MatDialogGeneratorService,
    MatSnackBarService,
    NgIfExtensionsService,
    P5Service,
    LayerControllerService,
    LayerListService,
    AssetHandlerService,
    SaveProjectService,
    LoadProjectService,
    WindowControllerService,
    CurrentProjectService,
    ToolListService,
    ToolHandlerService,
    SelectedToolService,
    TestToolService,
    ColorPickerToolService,
    MoveToolService,
    PencileToolService,
    P5DrawSemaphoreService,
    PlaceImageToolService,
    PenToolService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
