import { TestBed } from '@angular/core/testing';

import { ConfigSettingsService } from './config-settings.service';

describe('ConfigSettingsService', () => {
  let service: ConfigSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
