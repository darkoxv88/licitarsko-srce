import { Component, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { LayerListService } from 'src/app/core/p5/layer-list.service';
import { MatDialogGeneratorService } from 'src/app/core/shared/mat-dialog-generator.service';
import { LayersWindowNewLayerComponent } from './layers-window-new-layer/layers-window-new-layer.component';
import { CreateLayerEntity } from 'src/app/core/entities/main/layer/create-layer-entity';

@Component({
  selector: 'app-layers-window',
  templateUrl: './layers-window.component.html',
  styleUrls: ['./layers-window.component.scss']
})
export class LayersWindowComponent {

  constructor(
    private matDialogGeneratorService: MatDialogGeneratorService,
    private changeDetectorRef: ChangeDetectorRef,
    public layerListService: LayerListService) { 
  }

  public onDrop(event: CdkDragDrop<Array<any>>): void {
    this.layerListService.moveLayers(
      this.invertIndex(event.previousIndex), 
      this.invertIndex(event.currentIndex)
    );

    this.changeDetectorRef.detectChanges();
  }

  public invertIndex(i: number): number {
    return this.layerListService.size -1 -i;
  }

  public newLayer(): void {
    this.matDialogGeneratorService.openActionDialog('New layer', 'add_circle', 'Add', (data: CreateLayerEntity, closeDialog: Function) => { 
      this.layerListService.add(data?.name, data?.type);

      closeDialog();

      this.changeDetectorRef.detectChanges();
    }, LayersWindowNewLayerComponent, null);
  }

  public rename(): void {

  }
}
