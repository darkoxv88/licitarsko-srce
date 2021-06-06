import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppThemeService {

  private themeList: Array<string>;
  public get list(): Array<string> {
    return this.themeList;
  }
  private themeClasses: Array<string>;
  private eventVar: Subject<null>;
  private renderer: Renderer2;

  private primaryColor: any;
  private accentColor: any;

  private theme: string;
  get name(): string {
    return this.theme;
  }

  private fullTheme: string;
  get fullName(): string {
    return this.fullTheme;
  }

  private themeType: 'light' | 'dark';
  get type(): 'light' | 'dark' {
    return this.themeType;
  }

  constructor(public rendererFactory: RendererFactory2) {
    this.eventVar = new Subject();
    this.renderer = this.rendererFactory.createRenderer(null, null);

    this.themeType = 'light';

    this.themeList = [
      '-theme-a',
      '-theme-b',
      '-theme-c',
    ];

    this.themeClasses = [
      'light-theme-a',
      'light-theme-b',
      'light-theme-c',

      'dark-theme-a',
      'dark-theme-b',
      'dark-theme-c',
    ];

    this.primaryColor = {

    };

    this.accentColor = { 

    },

    this.setTheme('-theme-a');
  }

  public setTheme(value: string): void {
    if (!this.themeList.includes(value)) value = '-theme-a';

    this.theme = value;
    this.fullTheme = this.themeType + value;

    for (const element of this.themeClasses) {
      this.renderer.removeClass(document.body, element);
    }

    if (this.themeClasses.includes(this.fullTheme)) {
      this.renderer.addClass(document.body, this.fullTheme);
    }

    this.eventVar.next();
  }

  public swapTheme(): void {
    (this.themeType === 'light') ? this.themeType = 'dark' : this.themeType = 'light';

    this.setTheme(this.theme);
  }

  public subFunc(): Observable<null> {
    return this.eventVar.asObservable();
  }

}
