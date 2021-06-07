/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaceImageToolService } from './place-image-tool.service';

describe('Service: PlaceImageTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceImageToolService]
    });
  });

  it('should ...', inject([PlaceImageToolService], (service: PlaceImageToolService) => {
    expect(service).toBeTruthy();
  }));
});
