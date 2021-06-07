import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedToolService {

  private selectedTool: 'testTool' | 'colorPickerTool' | 'moveTool' | 'pencileTool' | 'placeImageTool';



  constructor() { 
    this.selectedTool = 'testTool';
  }



  public get selected(): 'testTool' | 'colorPickerTool' | 'moveTool' | 'pencileTool' | 'placeImageTool' {
    return this.selectedTool;
  }

  public selectTool(
    name: 'testTool' | 'colorPickerTool' | 'moveTool' | 'pencileTool' | 'placeImageTool'
  ) {
    this.selectedTool = name
  }

}
