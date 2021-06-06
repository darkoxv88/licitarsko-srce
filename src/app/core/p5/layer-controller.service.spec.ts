/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LayerControllerService } from './layer-controller.service';

describe('Service: LayerController', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayerControllerService]
    });
  });

  it('should ...', inject([LayerControllerService], (service: LayerControllerService) => {
    expect(service).toBeTruthy();
  }));
});
