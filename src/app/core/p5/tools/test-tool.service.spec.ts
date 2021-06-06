/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestToolService } from './test-tool.service';

describe('Service: TestTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestToolService]
    });
  });

  it('should ...', inject([TestToolService], (service: TestToolService) => {
    expect(service).toBeTruthy();
  }));
});
