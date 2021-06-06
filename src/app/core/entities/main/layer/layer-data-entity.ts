import { LayerDrawEntity } from "./layer-draw-entity";

export class LayerDataEntity {

  public type: 'layer' | 'parentMask'
  public name: string;
  public drawData: LayerDrawEntity;
  public show: boolean;

  constructor() {
    this.type = 'layer';
    this.name = 'Layer';
    this.drawData = new LayerDrawEntity();
    this.show = true;
  }

}
