import { Injectable } from '@angular/core';

import { AssetImageEntity } from './../../entities/main/windows/asset-image-entity';
import { ProjectSaveEntity } from '../../entities/main/project-save-entity';
import { AssetDetailEntity } from '../../entities/main/windows/asset-detail-entity';
import { LoadProjectService } from '../../project/load-project.service';
import { SaveProjectService } from '../../project/save-project.service';
import { CurrentProjectService } from 'src/app/core/data-transfers/current-project.service';
import { FileHandlers } from '../../../utilities/file-handlers';
import { tryCatch } from 'src/app/utilities/wrappers';

declare var p5jsUtility: any;

@Injectable({
  providedIn: 'root'
})
export class AssetHandlerService {

  private loader: any;
  private assetsDetailList: Array<AssetDetailEntity>;
  private assetsList: any;

  public get list(): Array<AssetDetailEntity> {
    return this.assetsDetailList;
  }

  private _selected: number;
  public set selected(data: number) {
    if (this.assetsList.length == 0) return;

    if (data < 0 || data > this.assetsList.length) {
      this._selected = 0;
      return;
    }

    this._selected = data;
  }
  public get selected(): number {
    return this._selected;
  }

  constructor(
      private loadProjectService: LoadProjectService,
      private saveProjectService: SaveProjectService,
      private currentProjectService: CurrentProjectService) { 
    this._selected = null;
    this.loader = p5jsUtility;
    this.assetsList = { };
    this.assetsDetailList = new Array<AssetDetailEntity>();

    this.loadProjectService.onLoad().subscribe((save: ProjectSaveEntity) => {
      this._selected = null;
      this.assetsList = { };
      this.assetsDetailList = save.assetsDetailList;

      for (let i = 0; i < this.assetsDetailList.length; i++) {
        this.loader.loadImage(this.assetsDetailList[i].url, image => {
          this.assetsList[this.assetsDetailList[i].name] = image;
          this._selected = i;
        });
      }

    });

    this.saveProjectService.onSave().subscribe((save: ProjectSaveEntity) => {
      save.assetsDetailList = this.assetsDetailList;
    });

    this.currentProjectService.onNewProject().subscribe(() => {
      this._selected = null;
      this.assetsList = { };
      this.assetsDetailList = new Array<AssetDetailEntity>();
    });
  }

  public checkIfNameExists(name: string): boolean {
    for (let item of this.assetsDetailList) {
      if (item.name === name) return true;
    }

    return false;
  }

  public async loadAsset(file: File, name: string, onDone: Function) {
    FileHandlers.loadImageFromObject(file).then((img: HTMLImageElement) => {
      this.loader.loadImage(img.src, image => {
        let index = this.assetsDetailList.push({
          name: name,
          url: img.src,
        });

        this.assetsList['name'] = image;

        this._selected = index - 1;

        (tryCatch(onDone, (err: any) => { console.error(err) }))();
      }); 
    });
  }

  public getSelectedName(): string {
    try {
      return this.assetsDetailList[this._selected].name;
    } catch (err) {
      return '';
    }
  }

  public getSelectedImage(): any {
    try {
      return this.assetsList[this.assetsDetailList[this._selected].name];
    } catch (err) {
      return null;
    }
  }

  public getImageByName(name: string): any {
    try {
      return this.assetsList[name];
    } catch (err) {
      return null;
    }
  }

}
