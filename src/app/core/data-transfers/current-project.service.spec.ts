/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurrentProjectService } from './current-project.service';

describe('Service: CurrentProject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentProjectService]
    });
  });

  it('should ...', inject([CurrentProjectService], (service: CurrentProjectService) => {
    expect(service).toBeTruthy();
  }));
});
