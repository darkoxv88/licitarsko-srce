import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ProjectSaveEntity } from '../entities/main/project-save-entity';
import { SafeJson } from 'src/app/utilities/safe-json';
import { SafeUri } from 'src/app/utilities/safe-uri';
import { FileHandlers } from 'src/app/utilities/file-handlers';

@Injectable({
  providedIn: 'root'
})
export class LoadProjectService {

  private onLoadSubject: Subject<ProjectSaveEntity>;
  private onLoadEndSubject: Subject<null>;

  constructor() {
    this.onLoadSubject = new Subject<ProjectSaveEntity>();
    this.onLoadEndSubject = new Subject<null>();
  }

  public onLoad(): Observable<ProjectSaveEntity> {
    return this.onLoadSubject.asObservable();
  }

  public onLoadEnd(): Observable<null> {
    return this.onLoadEndSubject.asObservable();
  }

  public load(file: File): void {
    if (!file) return;
    
    FileHandlers.loadFile(file, 'text').then((data: string) => {
      this.onLoadSubject.next(SafeJson.decode(SafeUri.decode(data)) as ProjectSaveEntity);

      this.onLoadEndSubject.next();
    }).catch(() => {
      console.warn('Could not load file!');
    });
  }

}
