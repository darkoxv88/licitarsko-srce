/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppThemeService } from './app-theme.service';

describe('Service: AppTheme', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppThemeService]
    });
  });

  it('should ...', inject([AppThemeService], (service: AppThemeService) => {
    expect(service).toBeTruthy();
  }));
});
