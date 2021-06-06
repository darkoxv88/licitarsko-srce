import { Component, OnInit, OnDestroy } from '@angular/core';

import { SelectedToolService } from 'src/app/core/p5/selected-tool.service';
import { LayerListService } from 'src/app/core/p5/layer-list.service';

@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit, OnDestroy {

  constructor(
      public layerListService: LayerListService,
      public selectedToolService: SelectedToolService) {
        
  }

  public ngOnInit(): void {
    document.addEventListener('keyup', this.keyHandlers);
  }

  public ngOnDestroy(): void {
    document.removeEventListener('keyup', this.keyHandlers);
  }
  
  private keyHandlers = (ev: KeyboardEvent) => {
    if (ev.key === 'q') {
      this.selectedToolService.selectTool('testTool');
    }
    if (ev.key === 'w') {
      this.selectedToolService.selectTool('moveTool');
    }
    if (ev.key === 'e') {
      this.selectedToolService.selectTool('colorPickerTool');
    }
  }
  
}
