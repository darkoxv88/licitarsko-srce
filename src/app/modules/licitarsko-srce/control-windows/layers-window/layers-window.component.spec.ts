/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LayersWindowComponent } from './layers-window.component';

describe('LayersWindowComponent', () => {
  let component: LayersWindowComponent;
  let fixture: ComponentFixture<LayersWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
