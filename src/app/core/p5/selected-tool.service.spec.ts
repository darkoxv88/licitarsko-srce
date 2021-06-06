/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelectedToolService } from './selected-tool.service';

describe('Service: SelectedTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedToolService]
    });
  });

  it('should ...', inject([SelectedToolService], (service: SelectedToolService) => {
    expect(service).toBeTruthy();
  }));
});
