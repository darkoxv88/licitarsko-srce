/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MoveToolService } from './move-tool.service';

describe('Service: MoveTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoveToolService]
    });
  });

  it('should ...', inject([MoveToolService], (service: MoveToolService) => {
    expect(service).toBeTruthy();
  }));
});
