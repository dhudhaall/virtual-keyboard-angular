import { TestBed } from '@angular/core/testing';

import { AngVirtualKeyboardService } from './ang-virtual-keyboard.service';

describe('AngVirtualKeyboardService', () => {
  let service: AngVirtualKeyboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngVirtualKeyboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
