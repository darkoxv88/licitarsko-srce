import { SaveColorPaletteEntity } from "./windows/save-color-palette-entity";
import { AssetDetailEntity } from "./windows/asset-detail-entity";
import { LayerDataEntity } from "./layer/layer-data-entity";

export class ProjectSaveEntity {
  public __id: string;
  public project: string;
  public name: string;
  public size: number;
  public colorPalette: SaveColorPaletteEntity;
  public assetsDetailList: Array<AssetDetailEntity>;
  public layerList: Array<LayerDataEntity>;

  constructor(project) {
    this.project = project;
    this.colorPalette = new SaveColorPaletteEntity();
    this.assetsDetailList = new Array<AssetDetailEntity>();
    this.layerList = new Array<LayerDataEntity>();
  }
}
