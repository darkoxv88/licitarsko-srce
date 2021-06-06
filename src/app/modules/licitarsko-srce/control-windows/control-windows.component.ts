import { Component, OnInit } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

import { ControlWindowRefEntity } from 'src/app/core/entities/shared/control-window-ref-entity';
import { DynamicComponentDirective } from 'src/app/shared/directives/dynamic-component.directive';
import { WindowControllerService } from '../../../core/data-transfers/window-controller.service';

@Component({
  selector: 'app-control-windows',
  templateUrl: './control-windows.component.html',
  styleUrls: ['./control-windows.component.scss']
})
export class ControlWindowsComponent implements OnInit {

  constructor(
      public windowControllerService: WindowControllerService) { 

  }

  ngOnInit() {
  }

  public test(event: CdkDragEnd, obj: ControlWindowRefEntity): any {
    obj.pos = event.source.element.nativeElement.style?.webkitTransform || event.source.element.nativeElement.style?.transform;
  }

}
