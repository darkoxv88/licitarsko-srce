/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CookieHandlerService } from './cookie-handler.service';

describe('Service: CookieHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CookieHandlerService]
    });
  });

  it('should ...', inject([CookieHandlerService], (service: CookieHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
