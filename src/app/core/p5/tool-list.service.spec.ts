/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToolListService } from './tool-list.service';

describe('Service: ToolList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolListService]
    });
  });

  it('should ...', inject([ToolListService], (service: ToolListService) => {
    expect(service).toBeTruthy();
  }));
});
