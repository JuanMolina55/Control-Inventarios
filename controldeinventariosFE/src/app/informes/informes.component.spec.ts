import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesComponent } from './informes.component';

describe('InformesComponent', () => {
  let component: InformesComponent;
  let fixture: ComponentFixture<InformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
