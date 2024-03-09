import { TestBed } from '@angular/core/testing';

import { SidenavWSService } from './sidenav-ws.service';

describe('SidenavWSService', () => {
  let service: SidenavWSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavWSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
