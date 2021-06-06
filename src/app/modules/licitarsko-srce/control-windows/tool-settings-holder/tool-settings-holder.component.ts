import { Component, Type } from '@angular/core';

import { ToolListService } from 'src/app/core/p5/tool-list.service';
import { SelectedToolService } from 'src/app/core/p5/selected-tool.service';

@Component({
  selector: 'app-tool-settings-holder',
  templateUrl: './tool-settings-holder.component.html',
  styleUrls: ['./tool-settings-holder.component.scss']
})
export class ToolSettingsHolderComponent {

  constructor(private toolListService: ToolListService, private selectedToolService: SelectedToolService) { }

  public getComponent(): Type<any> | null {
    return this.toolListService.getTool(this.selectedToolService.selected)?.component;
  }

}
