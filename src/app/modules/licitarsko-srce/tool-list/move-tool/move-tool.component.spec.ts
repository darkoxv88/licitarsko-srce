/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MoveToolComponent } from './move-tool.component';

describe('MoveToolComponent', () => {
  let component: MoveToolComponent;
  let fixture: ComponentFixture<MoveToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
