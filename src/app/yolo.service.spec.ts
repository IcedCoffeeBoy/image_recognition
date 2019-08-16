import { TestBed } from '@angular/core/testing';

import { YoloService } from './yolo.service';

describe('YoloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YoloService = TestBed.get(YoloService);
    expect(service).toBeTruthy();
  });
});
