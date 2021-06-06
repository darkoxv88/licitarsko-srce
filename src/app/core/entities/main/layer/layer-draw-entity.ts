export class LayerDrawEntity {

  public tool: 'testTool' | 'colorPickerTool' | 'moveTool' | 'pencileTool';
  public points: Array<number>;
  public details: any;
  public other: any;
  public transparency: number;
  public x: number;
  public y: number;

  constructor() {
    this.points = [];
    this.details = { }
    this.other = { }
    this.transparency = 255;
    this.x = 0;
    this.y = 0;
  }
  
}
