import { TestBed } from '@angular/core/testing';

import { CartStateService } from './cart-store';

describe('CartStateService', () => {
  let service: CartStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
