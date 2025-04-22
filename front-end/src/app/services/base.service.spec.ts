import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';
import { environment } from '../environments/environment';

describe('BaseService', () => {
  let service: BaseService<any>;
  let httpMock: HttpTestingController;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseService, StorageService]
    });
    service = TestBed.inject(BaseService);
    httpMock = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all items', () => {
    const mockItems = [{ id: 1, name: 'Item 1' }];
    service.getAll('items').subscribe(items => {
      expect(items.length).toBe(1);
      expect(items).toEqual(mockItems);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/items`);
    expect(req.request.method).toBe('GET');
    req.flush(mockItems);
  });

  it('should get an item by id', () => {
    const mockItem = { id: 1, name: 'Item 1' };
    service.get('items', 1).subscribe(item => {
      expect(item).toEqual(mockItem);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/items/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockItem);
  });

  it('should create an item', () => {
    const newItem = { name: 'New Item' };
    const mockItem = { id: 1, name: 'New Item' };
    service.create('items', newItem).subscribe(item => {
      expect(item).toEqual(mockItem);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/items`);
    expect(req.request.method).toBe('POST');
    req.flush(mockItem);
  });

  it('should update an item', () => {
    const updatedItem = { id: 1, name: 'Updated Item' };
    service.update('items', 1, updatedItem).subscribe(item => {
      expect(item).toEqual(updatedItem);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/items/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedItem);
  });

  afterEach(() => {
    httpMock.verify();
  });
});