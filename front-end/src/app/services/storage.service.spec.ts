import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get token', () => {
    const token = '12345';
    service.setToken(token);
    expect(service.getToken()).toBe(token);
  });

  it('should clear token', () => {
    service.setToken('12345');
    service.clearToken();
    expect(service.getToken()).toBeNull();
  });
});