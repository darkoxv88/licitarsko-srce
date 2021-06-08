import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedToolService {

  private selectedTool: 'testTool' | 'colorPickerTool' | 'moveTool' | 'pencileTool' | 'placeImageTool' | 'penTool';

  constructor() { 
    this.selectedTool = 'testTool';
  }

  public get selected(): 'testTool' | 'colorPickerTool' | 'moveTool' | 'pencileTool' | 'placeImageTool' | 'penTool' {
    return this.selectedTool;
  }

  public selectTool(
    name: 'testTool' | 'colorPickerTool' | 'moveTool' | 'pencileTool' | 'placeImageTool' | 'penTool'
  ) {
    this.selectedTool = name
  }

}
