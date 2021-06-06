import { Component, OnInit } from '@angular/core';

import { ColorPickerToolService } from 'src/app/core/p5/tools/color-picker-tool.service';
import { PaletteSettingsService } from 'src/app/core/data-transfers/windows/palette-settings.service';

@Component({
  selector: 'app-color-picker-tool',
  templateUrl: './color-picker-tool.component.html',
  styleUrls: ['./color-picker-tool.component.scss']
})
export class ColorPickerToolComponent implements OnInit {

  constructor(public colorPickerToolService: ColorPickerToolService, public paletteSettingsService: PaletteSettingsService) { }

  ngOnInit() {
  }

}
