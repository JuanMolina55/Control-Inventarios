import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipDocComponent } from './tip-doc.component';

describe('TipDocComponent', () => {
  let component: TipDocComponent;
  let fixture: ComponentFixture<TipDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
