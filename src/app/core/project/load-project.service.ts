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

  constructor() {
    this.onLoadSubject = new Subject<ProjectSaveEntity>();
  }

  public onLoad(): Observable<ProjectSaveEntity> {
    return this.onLoadSubject.asObservable();
  }

  public load(file: File): void {
    if (!file) return;
    
    FileHandlers.loadFile(file, 'text').then((data: string) => {
      this.onLoadSubject.next(SafeJson.decode(SafeUri.decode(data)) as ProjectSaveEntity);
    }).catch(() => {
      console.warn('Could not load file!');
    });
  }

}
