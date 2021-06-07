import { LayerDrawEntity } from "src/app/core/entities/main/layer/layer-draw-entity";
import { MouseDataEntity } from "src/app/core/entities/main/mouse-data-entity";

export interface IToolOnMouseReleasedLeft {
  onMouseReleasedLeft(obj: MouseDataEntity, toolData: LayerDrawEntity): void;
}
