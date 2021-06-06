/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { P5Service } from './p5.service';

describe('Service: P5', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [P5Service]
    });
  });

  it('should ...', inject([P5Service], (service: P5Service) => {
    expect(service).toBeTruthy();
  }));
});
