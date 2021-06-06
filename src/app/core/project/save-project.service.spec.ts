/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SaveProjectService } from './save-project.service';

describe('Service: SaveProject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveProjectService]
    });
  });

  it('should ...', inject([SaveProjectService], (service: SaveProjectService) => {
    expect(service).toBeTruthy();
  }));
});
