import { Component, OnInit } from '@angular/core';

import { PaletteSettingsService } from 'src/app/core/data-transfers/windows/palette-settings.service';

@Component({
  selector: 'app-palette-settings',
  templateUrl: './palette-settings.component.html',
  styleUrls: ['./palette-settings.component.scss']
})
export class PaletteSettingsComponent implements OnInit {

  public selected: string;

  private focus: 'fill' | 'stroke' | 'none';

  constructor(public paletteSettingsService: PaletteSettingsService) {
    this.selected = '';
    this.focus = 'fill';
  }

  public ngOnInit(): void {
    
  }

  public setField(color: string): void {
    if (this.focus == 'fill') this.paletteSettingsService.fill = color;
    if (this.focus == 'stroke') this.paletteSettingsService.stroke = color;
  }

  public onSelect(color: string): void {
    this.selected = color;
  }

  public setFocus(focus: 'fill' | 'stroke' | 'none'): void {
    this.focus = focus;
  }

  public addToList(): void {
    if (this.focus == 'fill') this.paletteSettingsService.addToList(this.paletteSettingsService.fill);
    if (this.focus == 'stroke') this.paletteSettingsService.addToList(this.paletteSettingsService.stroke);
  }

}
