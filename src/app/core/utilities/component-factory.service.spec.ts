/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComponentFactoryService } from './component-factory.service';

describe('Service: ComponentFactory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentFactoryService]
    });
  });

  it('should ...', inject([ComponentFactoryService], (service: ComponentFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
