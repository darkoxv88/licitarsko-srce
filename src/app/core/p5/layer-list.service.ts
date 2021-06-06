import { Injectable } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';

import { ProjectSaveEntity } from '../entities/main/project-save-entity';
import { LoadProjectService } from '../project/load-project.service';
import { SaveProjectService } from '../project/save-project.service';
import { CurrentProjectService } from '../data-transfers/current-project.service';
import { LayerDataEntity } from '../entities/main/layer/layer-data-entity';

@Injectable({
  providedIn: 'root'
})
export class LayerListService {

  private list: Array<LayerDataEntity>;
  public get size(): number {
    return this.list.length;
  }
  public get layerList(): Array<LayerDataEntity> {
    return this.list;
  }

  private selectedLayerIndex: number;
  public get isSelected(): boolean {
    if (this.selectedLayerIndex >= 0 && this.selectedLayerIndex < this.list.length) {
      return true;
    }

    return false;
  }
  public get selectedIndex(): number {
    return this.selectedLayerIndex;
  }
  public set selectedIndex(data: number) { }

  constructor(
      private loadProjectService: LoadProjectService, 
      private currentProjectService: CurrentProjectService,
      private saveProjectService: SaveProjectService) { 
    this.list = new Array<LayerDataEntity>();
    this.selectedLayerIndex = -1;
    this.list.push(new LayerDataEntity());
    this.list[0].name = 'Layer 0';

    this.loadProjectService.onLoad().subscribe((save: ProjectSaveEntity) => {
      if (save.layerList) { 
        this.list = save.layerList; 
        this.selectLayer(0);
      } else {
        this.reset();
      }
    });
    this.saveProjectService.onSave().subscribe((save: ProjectSaveEntity) => {
      save.layerList = this.list;
    });
    this.currentProjectService.onNewProject().subscribe(() => {
      this.reset();
    });
  }

  public selectLayer(number: number): void {
    if (number < 0 || number >= this.size) return this.unselectLayer();

    this.selectedLayerIndex = number
  }

  public reset(): void {
    this.list = new Array<LayerDataEntity>();
    this.selectedLayerIndex = -1;
    this.list.push(new LayerDataEntity());
    this.list[0].name = 'Layer 1';
    this.selectLayer(0);
  }

  public add(name?: string, type?: null | 'layer' | 'parentMask'): void {
    const n: number = this.list.push(new LayerDataEntity());

    if (!name) {  
      this.list[n - 1].name = 'Layer ' + (n - 1);
    } else {
      this.list[n - 1].name = name;
    }

    if (!type) type = 'layer';
    
    this.list[n - 1].type = type;

    this.selectLayer(n - 1);
  }

  public iterate(callback: Function): void {
    if (typeof(callback) !== 'function') return;

    for (let i = 0; i < this.list.length; i++) {
      callback(this.list[i], (this.selectedLayerIndex === i));
    }
  }

  public delete(item: number): void {
    if (item < 0 || item >= this.list.length) return;

    this.list.splice(item, 1);

    if (this.list.length === 0) {
      return this.unselectLayer();
    }

    if (item === this.selectedLayerIndex) {
      this.selectLayer(0);
    }
  }

  public unselectLayer(): void {
    this.selectedLayerIndex = -1;
  }

  public moveLayers(oldPos: number, newPos: number): void {
    moveItemInArray(this.list, oldPos, newPos);

    if (this.selectedLayerIndex == oldPos) {
      this.selectedLayerIndex = newPos;

      return;
    }

    if (this.selectedLayerIndex == newPos) {
      this.selectedLayerIndex = oldPos;

      return;
    }

    if (oldPos < newPos) {
      if (this.selectedLayerIndex > oldPos && this.selectedLayerIndex < newPos) {
        this.selectedLayerIndex = this.selectedLayerIndex - 1;
      }

      return;
    }

    if (oldPos > newPos) {
      if (this.selectedLayerIndex < oldPos && this.selectedLayerIndex > newPos) {
        this.selectedLayerIndex = this.selectedLayerIndex + 1;
      }

      return;
    }
  }

  getSelectedLayer(): LayerDataEntity | null {
    if (this.selectedLayerIndex < 0) return null;

    try {
      return this.list[this.selectedLayerIndex];
    } catch (err) {
      return null;
    }
  }

}
