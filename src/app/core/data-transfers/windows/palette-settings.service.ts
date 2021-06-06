import { Injectable } from '@angular/core';

import { ColorHandlers } from 'src/app/utilities/color-handlers';
import { RgbaColorEntity } from '../../entities/other/rgba-color-entity';
import { ProjectSaveEntity } from '../../entities/main/project-save-entity';
import { LoadProjectService } from '../../project/load-project.service';
import { SaveProjectService } from '../../project/save-project.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaletteSettingsService {

  private colorRegEx: RegExp;

  private _fill: string;
  private _fillRGBA: RgbaColorEntity;
  public get fill(): string {
    return this._fill;
  }
  public get fillRGBA(): RgbaColorEntity {
    return this._fillRGBA;
  }
  public set fill(data: string) {
    if (this.colorRegEx.test(data) == false) data = '#000000';
    this._fill = data;
    this._fillRGBA = this.hexToRGBA(data);
  }
  public set fillRGBA(data: RgbaColorEntity) {
    this._fillRGBA = data;
    this._fill = ColorHandlers.rgbaToHex(data);
  }

  private _stroke: string;
  private _strokeRGBA: RgbaColorEntity;
  public get stroke(): string {
    return this._stroke
  }
  public set stroke(data: string) {
    if (this.colorRegEx.test(data) == false) data = '#000000';
    this._stroke = data;
    this._strokeRGBA = this.hexToRGBA(data);
  }
  public set strokeRGBA(data: RgbaColorEntity) {
    this._strokeRGBA = data;
    this._stroke = ColorHandlers.rgbaToHex(data);
  }

  private _colorList: any;
  private _colorListArray: Array<string>;

  public get colorListArray(): Array<string> {
    return this._colorListArray;
  }

  constructor(private loadProjectService: LoadProjectService, private saveProjectService: SaveProjectService) { 
    this.colorRegEx = /^#([0-9a-f]{6})$/i;
    this._fill = '#000000';
    this._fillRGBA = { r: 0, g: 0, b: 0, a: 255}
    this.stroke = '#000000';
    this._strokeRGBA = { r: 0, g: 0, b: 0, a: 255}
    this._colorList = { }
    this._colorListArray = [];

    this.addToList('#ffffff');
    this.addToList('#000000');

    this.addToList('#ff0000');
    this.addToList('#00ff00');
    this.addToList('#0000ff');

    this.addToList('#ffff00');
    this.addToList('#00ffff');
    this.addToList('#ff00ff');

    this.loadProjectService.onLoad().subscribe((data: ProjectSaveEntity) => {
      this.fill = data.colorPalette.fill;
      this.stroke = data.colorPalette.stroke;
      this._colorList = data.colorPalette.colorList;
      this._colorListArray = data.colorPalette.colorListArray;
    });
    this.saveProjectService.onSave().subscribe((data: ProjectSaveEntity) => {
      data.colorPalette.fill = this.fill;
      data.colorPalette.stroke = this.stroke;
      data.colorPalette.colorList = this._colorList;
      data.colorPalette.colorListArray = this._colorListArray;
    });
  }

  public addToList(obj: string): void {
    this._colorList[obj] = obj;
    this._colorListArray = [];

    for (let item in this._colorList) {
      this._colorListArray.push(item);
    }
  }

  public addRgbToList(obj: RgbaColorEntity): void {
    const color: string = ColorHandlers.rgbaToHex(obj);

    this._colorList[color] = color;
    this._colorListArray = [];

    for (let item in this._colorList) {
      this._colorListArray.push(item);
    }
  }

  public ifColorInList(name: string): boolean {
    return !!this._colorList[name];
  }

  private hexToRGBA(color: string): RgbaColorEntity {
    let out: RgbaColorEntity = new RgbaColorEntity();

    try {
      if (this.colorRegEx.test(color) == false) throw new Error('Color does not match!');

      color = color.substring(1);

      out.r = ColorHandlers.byte(parseInt(color[0] + color[1], 16));
      out.g = ColorHandlers.byte(parseInt(color[2] + color[3], 16));
      out.b = ColorHandlers.byte(parseInt(color[4] + color[5], 16));
      out.a = 255;
    } catch (err) {
      if (environment.production == false) {
        console.log(err);
      }

      out = {
        r: 0,
        g: 0,
        b: 0,
        a: 255,
      }
    }

    return out;
  }

}
