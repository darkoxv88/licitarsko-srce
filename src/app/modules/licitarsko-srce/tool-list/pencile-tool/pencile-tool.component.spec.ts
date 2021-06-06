/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PencileToolComponent } from './pencile-tool.component';

describe('PencileToolComponent', () => {
  let component: PencileToolComponent;
  let fixture: ComponentFixture<PencileToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PencileToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PencileToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
