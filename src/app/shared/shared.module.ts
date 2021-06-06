import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { DynamicTemplateComponent } from './components/dynamic-template/dynamic-template.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MainDialogComponent } from './components/main-dialog/main-dialog.component';
import { InitStyleDirective } from './directives/init-style.directive';
import { ParagraphsComponent } from './components/paragraphs/paragraphs.component';
import { NgForLoopByNumberPipe } from './pipes/ng-for-loop-by-number.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    DynamicComponentDirective,
    DynamicTemplateComponent,
    ErrorDialogComponent,
    MainDialogComponent,
    InitStyleDirective,
    ParagraphsComponent,
    NgForLoopByNumberPipe,
  ],
  entryComponents: [
    DynamicComponentDirective,
    DynamicTemplateComponent,
    ErrorDialogComponent,
    MainDialogComponent,
    InitStyleDirective,
    ParagraphsComponent,
    NgForLoopByNumberPipe,
  ],
  exports: [
    DynamicComponentDirective,
    DynamicTemplateComponent,
    ErrorDialogComponent,
    MainDialogComponent,
    InitStyleDirective,
    ParagraphsComponent,
    NgForLoopByNumberPipe,
  ],
})
export class SharedModule { }
