import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ProjectSaveEntity } from '../entities/main/project-save-entity';
import { MatSnackBarService } from '../shared/mat-snack-bar.service';
import { LoadProjectService } from '../project/load-project.service';
import { SaveProjectService } from '../project/save-project.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentProjectService {

  private _active: boolean;
  public get active(): boolean {
    return this._active;
  }

  private _name: string;
  public get name(): string {
    return this._name;
  }

  private _size: number;
  public get size(): number {
    return this._size;
  }

  private onCreateSubject: Subject<null>;
  private onNewProjectSubject: Subject<null>;

  constructor(
      private loadProjectService: LoadProjectService,
      private saveProjectService: SaveProjectService,
      private matSnackBarService: MatSnackBarService) {
    this._active = false;
    this._name = '';
    this._size = 0;
    this.onCreateSubject = new Subject<null>();
    this.onNewProjectSubject = new Subject<null>();
    this.loadProjectService.onLoad().subscribe((data: ProjectSaveEntity) => {
      this._name = data.name;
      this._size = data.size;
      this._active = true;
      this.onCreateSubject.next();
      this.matSnackBarService.openSnackBar('Loaded project: ' + this._name, 'neutral', 'Close')
    });
    this.saveProjectService.onSave().subscribe((data: ProjectSaveEntity) => {
      data.name = this._name;
      data.size = this._size;
    });
  }

  public registerNewProject(name: string, size: number): void {
    if (!name || !size) return null;
    this._active = true;
    this._name = name;
    this._size = size;
    this.onNewProjectSubject.next();
    this.onCreateSubject.next();
    this.matSnackBarService.openSnackBar('Created project: ' + this._name, 'neutral', 'Close');
  }

  public reset(): void {
    this._active = false;
    this._name = '';
    this._size = 0;
  }

  public procCreate(): void {
    this.onCreateSubject.next();
  }

  public onCreate(): Observable<null> {
    return this.onCreateSubject.asObservable();
  }

  public onNewProject(): Observable<null> {
    return this.onNewProjectSubject.asObservable();
  }

}
