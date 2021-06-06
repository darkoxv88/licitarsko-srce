import { Injectable } from '@angular/core';
import { ToolListService } from './tool-list.service';

@Injectable({
  providedIn: 'root'
})
export class ToolHandlerService {

  constructor(private toolListService: ToolListService) { }
  
  public getTool<T>(name: string): T {
    return this.toolListService.getTool(name)?.tool as T;
  }
  
}
