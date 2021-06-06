/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WindowControllerService } from './window-controller.service';

describe('Service: WindowController', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowControllerService]
    });
  });

  it('should ...', inject([WindowControllerService], (service: WindowControllerService) => {
    expect(service).toBeTruthy();
  }));
});
