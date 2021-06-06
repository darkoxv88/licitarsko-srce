import { Injectable } from '@angular/core';

import { IToolOnMouseMove } from 'src/app/interfaces/tools/i-tool-on-mouse-move';
import { IToolOnMouseClicked } from 'src/app/interfaces/tools/i-tool-on-mouse-clicked';

import { LayerDrawEntity } from '../../entities/main/layer/layer-draw-entity';
import { MouseDataEntity } from '../../entities/main/mouse-data-entity';

import { PaletteSettingsService } from '../../data-transfers/windows/palette-settings.service';

import { ColorHandlers } from 'src/app/utilities/color-handlers';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerToolService implements IToolOnMouseMove, IToolOnMouseClicked {

  private _hoverColor: string;
  public get hoverColor(): string {
    return this._hoverColor;
  }

  constructor(private paletteSettingsService: PaletteSettingsService) {
    this._hoverColor = '#000000'
  }

  public onMouseMove(obj: MouseDataEntity, toolData: LayerDrawEntity): void {
    if (obj.mInView) {
      const color: Uint8ClampedArray = obj.ctx.getImageData(obj.x, obj.y, 1, 1).data;

      this._hoverColor = ColorHandlers.rgbaToHex({
        r: color[0],
        g: color[1],
        b: color[2],
        a: 255
      });
    }
  }

  public onMouseClicked(obj: MouseDataEntity, toolData: LayerDrawEntity): void {
    if (obj.mInView) {
      const color: Uint8ClampedArray = obj.ctx.getImageData(obj.x, obj.y, 1, 1).data;

      this.paletteSettingsService.addRgbToList({
        r: color[0],
        g: color[1],
        b: color[2],
        a: 255
      });
    }
  }

}
