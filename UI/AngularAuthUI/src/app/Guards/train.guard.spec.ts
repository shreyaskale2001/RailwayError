import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { trainGuard } from './train.guard';

describe('trainGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => trainGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
