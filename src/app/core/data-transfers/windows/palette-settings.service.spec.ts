/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaletteSettingsService } from './palette-settings.service';

describe('Service: PaletteSettings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaletteSettingsService]
    });
  });

  it('should ...', inject([PaletteSettingsService], (service: PaletteSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
