import { Component, OnInit } from '@angular/core';

import { LayerListService } from 'src/app/core/p5/layer-list.service';
import { P5DrawSemaphoreService } from 'src/app/core/p5/p5-draw-semaphore.service';

@Component({
  selector: 'app-selected-layer-window',
  templateUrl: './selected-layer-window.component.html',
  styleUrls: ['./selected-layer-window.component.scss']
})
export class SelectedLayerWindowComponent implements OnInit {

  constructor(
      private p5DrawSemaphoreService: P5DrawSemaphoreService,
      public layerListService: LayerListService) { }

  ngOnInit() {
  }

  public procDraw(): void {
    this.p5DrawSemaphoreService.draw();
  }

  public log(data: any): void {
    console.log(data);
  }

}
