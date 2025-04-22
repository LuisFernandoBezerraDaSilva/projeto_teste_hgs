import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, StorageService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and return token', () => {
    const credentials = { username: 'test', password: 'password' };
    const mockResponse = { token: '12345' };

    service.login(credentials).subscribe(response => {
      expect(response.token).toEqual(mockResponse.token);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout', () => {
    service.logout().subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service.baseUrl}/logout`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
  });
});