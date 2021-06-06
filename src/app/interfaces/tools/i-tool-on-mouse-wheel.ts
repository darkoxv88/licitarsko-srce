import { LayerDrawEntity } from "src/app/core/entities/main/layer/layer-draw-entity";

export interface IToolOnMouseWheel {
  onMouseWheel(delta: number, toolData: LayerDrawEntity): void;
}
