import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatDialogGeneratorService } from 'src/app/core/shared/mat-dialog-generator.service';
import { P5Service } from 'src/app/core/p5/p5.service';
import { AppThemeService } from 'src/app/app-theme.service';
import { CookieHandlerService } from 'src/app/core/utilities/cookie-handler.service';
import { WindowControllerService } from '../../core/data-transfers/window-controller.service';
import { CurrentProjectService } from 'src/app/core/data-transfers/current-project.service';
import { NgIfExtensionsService } from 'src/app/core/utilities/ng-if-extensions.service';
import { environment } from 'src/environments/environment';
import { LoadProjectService } from 'src/app/core/project/load-project.service';
import { SaveProjectService } from 'src/app/core/project/save-project.service';

import { ParagraphsComponent } from 'src/app/shared/components/paragraphs/paragraphs.component';
import { AssetImporterComponent } from './asset-importer/asset-importer.component';

@Component({
  selector: 'app-licitarsko-srce',
  templateUrl: './licitarsko-srce.component.html',
  styleUrls: ['./licitarsko-srce.component.scss']
})
export class LicitarskoSrceComponent implements OnInit, AfterViewInit, OnDestroy {

  public newProjectForm: FormGroup;
  private onBuildSubscription: Subscription;

  constructor(
      private loadProjectService: LoadProjectService,
      private saveProjectService: SaveProjectService,
      private formBuilder: FormBuilder,
      private matDialogGeneratorService: MatDialogGeneratorService,
      private router: Router,
      private p5Service: P5Service,
      public ngIfEx: NgIfExtensionsService,
      public appThemeService: AppThemeService,
      public cookieHandlerService: CookieHandlerService,
      public currentProjectService: CurrentProjectService,
      public windowControllerService: WindowControllerService) { 
    this.newProjectForm = this.formBuilder.group({
      projectName: ['', [Validators.required]],
      projectSize: [600, [Validators.required, Validators.min(320)]],
    });
  }

  public ngOnInit(): void {
    this.onBuildSubscription = this.currentProjectService.onCreate().subscribe(() => {
      if (this.currentProjectService.active) {
        try {
          this.p5Service.build(this.currentProjectService.size);
        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      requestAnimationFrame(() => {
        if (this.currentProjectService.active && !this.p5Service.isViewSet) {
          return this.p5Service.build(this.currentProjectService.size);
        }

        if (environment.production === false) {
          if (!this.currentProjectService.active) this.currentProjectService.registerNewProject('Test', 600);
        }
      });
    }, 0);
  }

  public ngOnDestroy(): void {
    this.onBuildSubscription?.unsubscribe();

    this.p5Service.destroy();
  }

  public onCreateProject(): void {
    this.currentProjectService.registerNewProject(this.newProjectForm.value?.projectName, this.newProjectForm.value?.projectSize);
    this.newProjectForm.reset();
  }

  public navigate(path: string): void {
    this.router.navigate([path]);
  }

  public requestNew(): void {
    if (this.currentProjectService.active == true) {
      this.matDialogGeneratorService.openActionDialog<ParagraphsComponent>(
        'Create new project', 'note_add', 'Continue', 
        (data: any, closeDialog: Function) => {
          this.currentProjectService.reset();
          this.p5Service.destroy();
          closeDialog();
        }, 
        ParagraphsComponent, ['Curent project will be disposed off. Are you sure you want to proceed?']
      );
    } else {
      this.newProjectForm.reset();
    }
  }

  public saveProject(): void {
    if (this.currentProjectService.active == true) {
      this.saveProjectService.save(this.currentProjectService.name);
    }
  }

  public loadProject(e: Event): void {
    if (!e.target['files']) {
      return;
    }
      
    if (!e.target['files'][0]) {
      return;
    }

    this.loadProjectService.load(e.target['files'][0] as File);

    e.target['value'] = '';
  }

  public exportImg(): void {
    if (this.currentProjectService.active) {
      this.p5Service.save(this.currentProjectService.name);
    }
  }

  public importAsset(): void {
    if (this.currentProjectService.active == false) {
      return;
    }

    this.matDialogGeneratorService.openActionDialog<AssetImporterComponent>(
      'Upload asset', 'cloud_upload', '', 
      () => { }, 
      AssetImporterComponent, null
    );
  }

}
