import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { SafeJson } from 'src/app/utilities/safe-json';

@Injectable({
  providedIn: 'root'
})
export class CookieHandlerService {

  private _isAllowed: boolean;

  constructor(private cookieService: CookieService) { 
    this.setIsAllowed();
  }

  private setIsAllowed() {
    const cookies: boolean = SafeJson.decode<boolean>(this.cookieService.get('cookies'));
    
    this._isAllowed = !!cookies;

    setTimeout(() => {
      this.setIsAllowed();
    }, 1000)
  }

  public isAllowed(): boolean {
    return this._isAllowed;
  }

  public allow(): void {
    this.cookieService.set('cookies', SafeJson.encode<boolean>(true), 10000, '/');
  }

  public setCookie(name: string, value: string | number | boolean | null): void {
    const cookies: boolean = SafeJson.decode<boolean>(this.cookieService.get('cookies'));

    if (!cookies) return;

    this.cookieService.set(name, SafeJson.encode(value), 10000, '/');
  }

  public getCookie<T>(name: string): T | null {
    const cookies: boolean = SafeJson.decode<boolean>(this.cookieService.get('cookies'));

    if (!cookies) return null;

    return SafeJson.decode<any>(this.cookieService.get(name));
  }

}
