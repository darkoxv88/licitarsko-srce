import { LayerDrawEntity } from "src/app/core/entities/main/layer/layer-draw-entity";
import { MouseDataEntity } from "src/app/core/entities/main/mouse-data-entity";

export interface IToolOnMouseClicked {
  onMouseClicked(obj: MouseDataEntity, toolData: LayerDrawEntity): void
}
