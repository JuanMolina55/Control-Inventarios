import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipdocComponent } from './tipdoc.component';

describe('TipdocComponent', () => {
  let component: TipdocComponent;
  let fixture: ComponentFixture<TipdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipdocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
