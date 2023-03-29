import { TestBed } from '@angular/core/testing';

import { ServiciocontrolinventariosService } from './serviciocontrolinventarios.service';

describe('ServiciocontrolinventariosService', () => {
  let service: ServiciocontrolinventariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciocontrolinventariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
