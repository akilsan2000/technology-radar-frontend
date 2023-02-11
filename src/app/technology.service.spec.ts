import { TestBed } from '@angular/core/testing';

import { TechnologyService } from './_services';

describe('TechnologyService', () => {
  let service: TechnologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
