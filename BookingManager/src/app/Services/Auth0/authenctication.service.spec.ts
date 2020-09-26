import { TestBed } from '@angular/core/testing';

import { AuthencticationService } from './authenctication.service';

describe('AuthencticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthencticationService = TestBed.get(AuthencticationService);
    expect(service).toBeTruthy();
  });
});
