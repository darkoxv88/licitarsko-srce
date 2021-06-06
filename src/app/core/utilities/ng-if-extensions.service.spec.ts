/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgIfExtensionsService } from './ng-if-extensions.service';

describe('Service: NgIfExtensions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgIfExtensionsService]
    });
  });

  it('should ...', inject([NgIfExtensionsService], (service: NgIfExtensionsService) => {
    expect(service).toBeTruthy();
  }));
});
