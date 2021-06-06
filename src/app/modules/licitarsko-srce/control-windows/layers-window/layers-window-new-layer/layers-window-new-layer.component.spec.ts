/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LayersWindowNewLayerComponent } from './layers-window-new-layer.component';

describe('LayersWindowNewLayerComponent', () => {
  let component: LayersWindowNewLayerComponent;
  let fixture: ComponentFixture<LayersWindowNewLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersWindowNewLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersWindowNewLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
