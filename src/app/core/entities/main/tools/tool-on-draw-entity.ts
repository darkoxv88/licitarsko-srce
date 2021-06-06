import { LayerDrawEntity } from "../layer/layer-draw-entity";

export class ToolOnDrawEntity {
  public g: any; 
  public gRef: any;
  public ctx: CanvasRenderingContext2D; 
  public size: number; 
  public scale: number;
  public drawForSave: boolean;
  public toolData: LayerDrawEntity
}
