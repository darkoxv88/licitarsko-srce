/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatDialogGeneratorService } from './mat-dialog-generator.service';

describe('Service: MatDialogGen', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatDialogGeneratorService]
    });
  });

  it('should ...', inject([MatDialogGeneratorService], (service: MatDialogGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
