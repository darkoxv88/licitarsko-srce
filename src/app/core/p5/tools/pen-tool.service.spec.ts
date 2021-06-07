/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PenToolService } from './pen-tool.service';

describe('Service: PenTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PenToolService]
    });
  });

  it('should ...', inject([PenToolService], (service: PenToolService) => {
    expect(service).toBeTruthy();
  }));
});
