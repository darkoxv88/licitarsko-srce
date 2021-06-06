/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LayerListService } from './layer-list.service';

describe('Service: LayerList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayerListService]
    });
  });

  it('should ...', inject([LayerListService], (service: LayerListService) => {
    expect(service).toBeTruthy();
  }));
});
