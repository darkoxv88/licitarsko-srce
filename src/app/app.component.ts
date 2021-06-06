import { Component, OnInit, AfterViewInit } from '@angular/core';

import { CookieHandlerService } from './core/utilities/cookie-handler.service';
import { AppThemeService } from './app-theme.service';
import { P5Service } from './core/p5/p5.service';

import { InitService } from './core/init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
      private initService: InitService,
      private cookieHandlerService: CookieHandlerService,
      private p5: P5Service,
      private appThemeService: AppThemeService) {
  }

  public ngOnInit(): void {
    if (this.cookieHandlerService.isAllowed()) {
      this.appThemeService.setTheme(this.cookieHandlerService.getCookie('themeName'));
      if (this.cookieHandlerService.getCookie('themeType') === 'dark') this.appThemeService.swapTheme();
    }
  }

  public ngAfterViewInit(): void {

  }

}
