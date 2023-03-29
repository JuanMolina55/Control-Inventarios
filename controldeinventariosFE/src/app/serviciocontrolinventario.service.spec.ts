import { TestBed } from '@angular/core/testing';

import { ServiciocontrolinventarioService } from './serviciocontrolinventario.service';

describe('ServiciocontrolinventarioService', () => {
  let service: ServiciocontrolinventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciocontrolinventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
