/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { P5DrawSemaphoreService } from './p5-draw-semaphore.service';

describe('Service: P5DrawSemaphore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [P5DrawSemaphoreService]
    });
  });

  it('should ...', inject([P5DrawSemaphoreService], (service: P5DrawSemaphoreService) => {
    expect(service).toBeTruthy();
  }));
});
