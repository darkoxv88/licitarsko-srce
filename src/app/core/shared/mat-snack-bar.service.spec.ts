/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatSnackBarService } from './mat-snack-bar.service';

describe('Service: MatSnackBar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatSnackBarService]
    });
  });

  it('should ...', inject([MatSnackBarService], (service: MatSnackBarService) => {
    expect(service).toBeTruthy();
  }));
});
