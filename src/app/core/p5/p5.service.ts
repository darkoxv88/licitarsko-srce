import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LayerControllerService } from './layer-controller.service';
import { RandomGenerator } from './../../utilities/random-generator';
import { P5Utility } from './../../utilities/p5-utility';
import { MouseDataEntity } from './../entities/main/mouse-data-entity';
import { P5DrawSemaphoreService } from './p5-draw-semaphore.service';

import { environment } from './../../../environments/environment';

declare var p5: any;

@Injectable({
  providedIn: 'root'
})
export class P5Service {

  private _p5: any;

  private canvas: any;
  private canvasView: HTMLCanvasElement;

  private _canInteract: boolean;
  private _hx: number;
  public get hx(): number {
    return this._hx;
  }

  private _hy: number;
  public get hy(): number {
    return this._hy;
  }

  public get isViewSet(): boolean {
    return !!this.canvasView;
  }

  public get view(): HTMLCanvasElement {
    return this.canvasView;
  }

  private onCreateSubject: Subject<HTMLCanvasElement>;
  private destroySubject: Subject<null>;
  private zoomSubject: BehaviorSubject<number>;
  private saveSubject: Subject<string>;
  private onDestroySubject: Subject<null>;

  public get zoomAspect(): number {
    return this.zoomSubject.value;
  }

  constructor(private layerControllerService: LayerControllerService, private p5DrawSemaphoreService: P5DrawSemaphoreService) {
    this._p5 = p5;
    this.onCreateSubject = new Subject<HTMLCanvasElement>();
    this.destroySubject = new Subject<null>();
    this.zoomSubject = new BehaviorSubject<number>(1);
    this.saveSubject = new Subject<string>();
    this.onDestroySubject = new Subject<null>();
    this._canInteract = false;
    this._hx = 0;
    this._hy = 0;
  }

  public enableInteraction(): void {
    this._canInteract = true;
  }

  public disableInteraction(): void {
    this._canInteract = false;
  }



  public build(canvasSize: number): void {
    this.destroy();
    
    this.canvas = new this._p5(s => {
      let size: number = canvasSize;
      let pg: any = s.createGraphics(size, size);
      let pgRefreshed: any = s.createGraphics(size, size);
      let scale: number = this.zoomSubject.value;
      let ctx: CanvasRenderingContext2D;
      let saveProc: Function;

      const zoomSub: Subscription = this.zoomSubject.asObservable().subscribe((value: number) => {
        scale = value;
        size = canvasSize * scale;
        s.resizeCanvas(size, size);
        pg = s.createGraphics(size, size);
        pgRefreshed = s.createGraphics(size, size);
        this.p5DrawSemaphoreService.draw();
      });

      const saveSub: Subscription = this.saveSubject.asObservable().subscribe((lName: string) => {
        size = canvasSize;
        s.resizeCanvas(size, size);
        pg = s.createGraphics(size, size);
        pgRefreshed = s.createGraphics(size, size);

        saveProc = () => {
          s.saveCanvas('LicitarskoSrce_' + lName + '_' + RandomGenerator.idString(16), '.png');
          size = canvasSize * scale;
          s.resizeCanvas(size, size);
          pg = s.createGraphics(size, size);
          pgRefreshed = s.createGraphics(size, size);
          this.p5DrawSemaphoreService.draw();
        }
      });

      s.preload = () => {

      }

      s.setup = () => {
        s.noCanvas();

        let temp = s.createCanvas(size, size);
        temp.parent('app-trash');
        ctx = temp.drawingContext;
        this.canvasView = temp.elt as HTMLCanvasElement;

        s.background(0, 0, 0, 0);

        pg.background(0, 0, 0, 0);

        s.image(pg, 0, 0, size, size);

        this.p5DrawSemaphoreService.draw();

        this.onCreateSubject.next(this.canvasView);
      };

      s.draw = () => {
        const drawForSave: boolean = (typeof(saveProc) === 'function');
        const shouldDraw: boolean = this.p5DrawSemaphoreService.shouldDraw();

        if (shouldDraw == false && drawForSave == false) return;

        s.clear();
        s.background(0, 0, 0, 0);

        const lScale: number = drawForSave ? 1 : scale

        this.layerControllerService.onDraw(s, pg, pgRefreshed, ctx, size, lScale, drawForSave);

        this.p5DrawSemaphoreService.drawn();

        if (drawForSave) {
          if (s.height == size && s.width == size) {
            saveProc();
            saveProc = null;
          }
        }
      };

      s.mouseMoved = () => {
        this._hx = s.mouseX;
        this._hy = s.mouseY;

        if (!this._canInteract) return;
        
        this.layerControllerService.onMouseMove({
          ctx: ctx, size: size, x: s.mouseX, y: s.mouseY, 
          mInView: P5Utility.checkIfClickIn(s.mouseX, s.mouseY, size),
          mpInView: P5Utility.checkIfClickIn(s.pmouseX, s.pmouseY, size),
          px: s.pmouseX, py: s.pmouseY, mx: s.movedX, my: s.movedY, scale: scale
        });
      }

      s.mouseClicked = () => {
        if (!this._canInteract) return;

        this.layerControllerService.onMouseClicked({
          ctx: ctx, size: size, x: s.mouseX, y: s.mouseY, 
          mInView: P5Utility.checkIfClickIn(s.mouseX, s.mouseY, size),
          mpInView: P5Utility.checkIfClickIn(s.pmouseX, s.pmouseY, size),
          px: s.pmouseX, py: s.pmouseY, mx: s.movedX, my: s.movedY, scale: scale
        });

        this.p5DrawSemaphoreService.draw();
      }

      s.doubleClicked = () => {
        if (!this._canInteract) return;

        this.layerControllerService.onMouseDoubleClicked({
          ctx: ctx, size: size, x: s.mouseX, y: s.mouseY, 
          mInView: P5Utility.checkIfClickIn(s.mouseX, s.mouseY, size),
          mpInView: P5Utility.checkIfClickIn(s.pmouseX, s.pmouseY, size),
          px: s.pmouseX, py: s.pmouseY, mx: s.movedX, my: s.movedY, scale: scale
        });

        this.p5DrawSemaphoreService.draw();
      }

      s.mousePressed = () => {
        if (!this._canInteract) return;

        let lData: MouseDataEntity = {
          ctx: ctx, size: size, x: s.mouseX, y: s.mouseY, 
          mInView: P5Utility.checkIfClickIn(s.mouseX, s.mouseY, size),
          mpInView: P5Utility.checkIfClickIn(s.pmouseX, s.pmouseY, size),
          px: s.pmouseX, py: s.pmouseY, mx: s.movedX, my: s.movedY, scale: scale
        };

        if (s.mouseButton === s.LEFT) {
          this.layerControllerService.onMousePressedLeft(lData);
        }
        if (s.mouseButton === s.RIGHT) {
          this.layerControllerService.onMousePressedRight(lData);
        }
        if (s.mouseButton === s.CENTER) {
          this.layerControllerService.onMousePressedCenter(lData);
        }
      }

      s.mouseDragged = () => {
        if (!this._canInteract) return;

        let lData: MouseDataEntity = {
          ctx: ctx, size: size, x: s.mouseX, y: s.mouseY, 
          mInView: P5Utility.checkIfClickIn(s.mouseX, s.mouseY, size),
          mpInView: P5Utility.checkIfClickIn(s.pmouseX, s.pmouseY, size),
          px: s.pmouseX, py: s.pmouseY, mx: s.movedX, my: s.movedY, scale: scale
        };

        if (s.mouseButton === s.LEFT) {
          this.layerControllerService.onMouseDraggedLeft(lData);
        }
        if (s.mouseButton === s.RIGHT) {
          this.layerControllerService.onMouseDraggedRight(lData);
        }
        if (s.mouseButton === s.CENTER) {
          this.layerControllerService.onMouseDraggedCenter(lData);
        }
      }

      s.mouseReleased = () => {
        if (!this._canInteract) return;

        let lData: MouseDataEntity = {
          ctx: ctx, size: size, x: s.mouseX, y: s.mouseY, 
          mInView: P5Utility.checkIfClickIn(s.mouseX, s.mouseY, size),
          mpInView: P5Utility.checkIfClickIn(s.pmouseX, s.pmouseY, size),
          px: s.pmouseX, py: s.pmouseY, mx: s.movedX, my: s.movedY, scale: scale
        };

        if (s.mouseButton === s.LEFT) {
          this.layerControllerService.onMouseReleasedLeft(lData);
        }
        if (s.mouseButton === s.RIGHT) {
          this.layerControllerService.onMouseReleasedRight(lData);
        }
        if (s.mouseButton === s.CENTER) {
          this.layerControllerService.onMouseReleasedCenter(lData);
        }

        this.p5DrawSemaphoreService.draw();
      };

      s.mouseWheel = (ev) => {
        if (!this._canInteract) return;

        let delta = ev?.delta

        if (!delta) return;

        if (delta < 0) {
          delta = -1;
        }

        if (delta > 0) {
          delta = 1;
        }

        this.layerControllerService.onMouseWheel(delta);
      }

      s.keyPressed = () => {
        if (!this._canInteract) return;

        this.layerControllerService.onKeyPressed(s.key, s.keyCode);

        this.p5DrawSemaphoreService.draw();
      };

      s.keyReleased = () => {
        if (!this._canInteract) return;

        this.layerControllerService.onKeyReleased(s.key, s.keyCode);

        this.p5DrawSemaphoreService.draw();
      }

      const destroySub: Subscription = this.destroySubject.asObservable().subscribe(() => {
        s.remove();
        pg.remove();
        saveProc = null;
        zoomSub.unsubscribe();
        saveSub.unsubscribe();
        destroySub.unsubscribe();
        if (environment.production == false) {
          console.log('canvas destroyed!');
        }
      });
    });
  }



  public destroy(): void {
    this.onDestroySubject.next();
    this.destroySubject.next();
    this.canvas = null;
    this.canvasView = null;
    this._canInteract = false;
  }

  public onCreate(): Observable<HTMLCanvasElement> {
    return this.onCreateSubject.asObservable();
  }

  public onDestroy(): Observable<null> {
    return this.onDestroySubject.asObservable();
  }

  public zoom(value: number): void {
    this.zoomSubject.next(value);
  }

  public save(name: string): void {
    this.saveSubject.next(name);
  }

}
