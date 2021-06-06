import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ProjectSaveEntity } from '../entities/main/project-save-entity';
import { RandomGenerator } from 'src/app/utilities/random-generator';
import { SafeJson } from 'src/app/utilities/safe-json';
import { FileHandlers } from 'src/app/utilities/file-handlers';

@Injectable({
  providedIn: 'root'
})
export class SaveProjectService {

  private onSaveSubject: Subject<ProjectSaveEntity>;

  constructor() { 
    this.onSaveSubject = new Subject<ProjectSaveEntity>();
  }

  public onSave(): Observable<ProjectSaveEntity> {
    return this.onSaveSubject.asObservable();
  }

  public save(name: string): void {
    const id: string = RandomGenerator.idString(8);
    const pName: string = 'licitarsko-srce-' + name + '-' + id;

    let project: ProjectSaveEntity = new ProjectSaveEntity(pName);
    project.__id = id;

    this.onSaveSubject.next(project);

    FileHandlers.downloadFile(SafeJson.encode(project), pName);
  }

}
