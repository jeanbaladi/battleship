import { TestBed } from '@angular/core/testing';

import { OutGameService } from './out-game.service';

describe('OutGameService', () => {
  let service: OutGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
