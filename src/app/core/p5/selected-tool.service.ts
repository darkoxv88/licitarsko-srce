import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedToolService {

  private selectedTool: 'testTool' | 'colorPickerTool' | 'moveTool' | 'pencileTool';



  constructor() { 
    this.selectedTool = 'testTool';
  }



  public get selected(): 'testTool' | 'colorPickerTool' | 'moveTool' | 'pencileTool' {
    return this.selectedTool;
  }

  public selectTool(
    name: 'testTool' | 'colorPickerTool' | 'moveTool' | 'pencileTool'
  ) {
    this.selectedTool = name
  }

}
