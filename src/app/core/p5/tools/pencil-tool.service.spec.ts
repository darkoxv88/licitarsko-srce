/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PencilToolService } from './pencil-tool.service';

describe('Service: PencilTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PencilToolService]
    });
  });

  it('should ...', inject([PencilToolService], (service: PencilToolService) => {
    expect(service).toBeTruthy();
  }));
});
