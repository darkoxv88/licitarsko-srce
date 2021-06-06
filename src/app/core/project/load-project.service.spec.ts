/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadProjectService } from './load-project.service';

describe('Service: LoadProject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadProjectService]
    });
  });

  it('should ...', inject([LoadProjectService], (service: LoadProjectService) => {
    expect(service).toBeTruthy();
  }));
});
