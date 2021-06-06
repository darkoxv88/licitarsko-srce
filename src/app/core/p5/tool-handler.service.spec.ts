/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToolHandlerService } from './tool-handler.service';

describe('Service: ToolHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolHandlerService]
    });
  });

  it('should ...', inject([ToolHandlerService], (service: ToolHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
