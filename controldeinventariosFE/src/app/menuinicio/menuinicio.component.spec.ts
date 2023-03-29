import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuinicioComponent } from './menuinicio.component';

describe('MenuinicioComponent', () => {
  let component: MenuinicioComponent;
  let fixture: ComponentFixture<MenuinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuinicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
