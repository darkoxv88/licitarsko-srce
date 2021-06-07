import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class P5DrawSemaphoreService {

  private drawCount: number;

  constructor() { 
    this.drawCount = 0;

    this.refresher();
  }

  private refresher = (): void => {
    if (this.drawCount <= 0) this.drawCount = this.drawCount + 1;

    this.timerRefresh();
  }

  private timerRefresh(): void {
    setTimeout(this.refresher, 2500);
  }

  public shouldDraw(): boolean {
    if (this.drawCount > 0) return true;

    return false;
  }

  public draw(): void {
    if (this.drawCount < 4) this.drawCount = this.drawCount + 1;
  }

  public drawn(): void {
    if (this.drawCount > 0) this.drawCount = this.drawCount - 1;
  }

}
