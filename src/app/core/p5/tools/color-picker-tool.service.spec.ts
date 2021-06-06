/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ColorPickerToolService } from './color-picker-tool.service';

describe('Service: ColorPickerTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorPickerToolService]
    });
  });

  it('should ...', inject([ColorPickerToolService], (service: ColorPickerToolService) => {
    expect(service).toBeTruthy();
  }));
});
