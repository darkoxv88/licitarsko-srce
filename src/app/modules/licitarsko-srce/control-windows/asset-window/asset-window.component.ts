import { Component, OnInit } from '@angular/core';
import { AssetHandlerService } from 'src/app/core/data-transfers/windows/asset-handler.service';
import { AssetDetailEntity } from 'src/app/core/entities/main/windows/asset-detail-entity';

@Component({
  selector: 'app-asset-window',
  templateUrl: './asset-window.component.html',
  styleUrls: ['./asset-window.component.scss']
})
export class AssetWindowComponent {

  constructor(public assetHandlerService: AssetHandlerService) { }

  public select(index: number): void {
    this.assetHandlerService.selected = index;
  } 

}
