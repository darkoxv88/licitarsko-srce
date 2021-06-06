import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { CurrentProjectService } from 'src/app/core/data-transfers/current-project.service';
import { RandomGenerator } from 'src/app/utilities/random-generator';
import { P5Service } from 'src/app/core/p5/p5.service';

@Component({
  selector: 'app-canvas-container',
  templateUrl: './canvas-container.component.html',
  styleUrls: ['./canvas-container.component.scss']
})
export class CanvasContainerComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  @ViewChild('canvasContainer', {static: false}) public canvasContainer: ElementRef;

  public containerID: string;

  public onCanvasCreateSubscription: Subscription;
  private onCanvasDestroySubscription: Subscription;
  private focused: boolean;

  public zoomRatio: number;
  private isKeyLocked: boolean;

  private canvas: HTMLCanvasElement;

  constructor(
      private renderer: Renderer2,
      private p5Service: P5Service,
      public currentProjectService: CurrentProjectService) {
    this.zoomRatio = 100;
    this.isKeyLocked = false; 
    this.containerID = 'canvas-container-component-id-' + RandomGenerator.idString(6);
    this.focused = false;
  }

  public ngOnInit(): void {
    this.onCanvasCreateSubscription = this.p5Service.onCreate().subscribe((canvas: HTMLCanvasElement) => {
      requestAnimationFrame(() => {
        this.canvas = canvas;

        while (this.canvasContainer.nativeElement.firstChild) {
          this.renderer.removeChild(this.canvasContainer.nativeElement, this.canvasContainer.nativeElement.firstChild);
          this.canvasContainer.nativeElement.innerHTML = '';
        }

        this.renderer.appendChild(this.canvasContainer.nativeElement, this.canvas);
      });
    });

    this.onCanvasDestroySubscription = this.p5Service.onDestroy().subscribe(() => {
      this.canvas = null;
    });

    document.addEventListener('keydown', this.keydownEvent);
    document.addEventListener('keyup', this.keyupEvent);
    document.addEventListener('wheel', this.scrollEvent);
  }

  public ngAfterViewInit(): void {
    requestAnimationFrame(() => {  
      if (this.currentProjectService.active && !this.canvas && this.p5Service.isViewSet) {
        this.canvas = this.p5Service.view;
      }
    });
  }

  public ngAfterViewChecked(): void {
    if (this.canvasContainer?.nativeElement.firstChild || !this.canvas) { 
      return;
    }

    if (this.p5Service.isViewSet && this.currentProjectService.active) {
      this.renderer.appendChild(this.canvasContainer.nativeElement, this.canvas);
    }

  }

  public ngOnDestroy(): void {
    if (this.canvasContainer.nativeElement?.firstChild) {
      this.renderer.removeChild(this.canvasContainer.nativeElement, this.canvasContainer.nativeElement.firstChild);
    }

    this.onCanvasCreateSubscription?.unsubscribe();
    this.onCanvasDestroySubscription?.unsubscribe();

    document.removeEventListener('keydown', this.keydownEvent);
    document.removeEventListener('keyup', this.keyupEvent);
    document.removeEventListener('wheel', this.scrollEvent);

    this.canvas = null;
  }

  public setZoom(value: number): void {
    if (typeof(this.zoomRatio) !== 'number') this.zoomRatio = 100;

    this.zoomRatio = this.zoomRatio * value;

    if (this.zoomRatio > 400) this.zoomRatio = 400;
    if (this.zoomRatio < 4) this.zoomRatio = 4;

    this.p5Service.zoom(this.zoomRatio / 100);
  }

  private scrollEvent = (ev: any): void => {
    if (this.isKeyLocked === false) return;

    if (ev?.wheelDelta < 0) { 
      this.setZoom(0.8);
    }

    if (ev?.wheelDelta > 0) { 
      this.setZoom(1.25);
    }
  }

  private keydownEvent = (ev: KeyboardEvent): void => {
    this.isKeyLocked = ev.shiftKey;
  }

  private keyupEvent = (ev: KeyboardEvent): void => {
    this.isKeyLocked = ev.shiftKey;
  }

  public setFocus(): void {
    if (this.focused === false) this.canvasContainer.nativeElement.focus();
  }

  public onFocusEle(): void {
    this.focused = true;
    this.p5Service.enableInteraction();
  }

  public onFocusLeaveEle(): void {
    this.focused = false;
    this.p5Service.disableInteraction();
  }

}
