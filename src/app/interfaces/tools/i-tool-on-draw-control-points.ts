import { LayerDrawEntity } from "src/app/core/entities/main/layer/layer-draw-entity";

export interface IToolOnDrawControlPoints {
  onDrawControlPoint(
    g: any, gRef: any, ctx: CanvasRenderingContext2D, size: number, scale: number, drawForSave: boolean, toolData: LayerDrawEntity
  ): void;
}
