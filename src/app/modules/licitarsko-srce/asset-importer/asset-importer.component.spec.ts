/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AssetImporterComponent } from './asset-importer.component';

describe('AssetImporterComponent', () => {
  let component: AssetImporterComponent;
  let fixture: ComponentFixture<AssetImporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetImporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
