import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let storageService: jasmine.SpyObj<StorageService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['setToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const activatedRouteSpy = { snapshot: { params: {} } }; // Mock básico do ActivatedRoute

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        BrowserAnimationsModule, 
        LoginPageComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy } // Adicionado mock do ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully', () => {
    const mockResponse = { token: '12345' };
    authService.login.and.returnValue(of(mockResponse));

    component.username = 'admin';
    component.password = 'admin123';
    fixture.detectChanges(); 

    const loginButton: DebugElement = fixture.debugElement.query(By.css('button'));
    expect(loginButton).not.toBeNull(); 

    loginButton.nativeElement.click();

    setTimeout(() => {
      expect(authService.login).toHaveBeenCalledWith({ username: 'admin', password: 'admin123' });
      expect(storageService.setToken).toHaveBeenCalledWith(mockResponse.token);
      expect(router.navigate).toHaveBeenCalledWith(['/list']);
    }, 100);
  });

  it('should show error message on login failure', () => {
    authService.login.and.returnValue(throwError({ status: 401 }));

    component.username = 'admin';
    component.password = 'admin123';

    fixture.detectChanges(); 

    const loginButton: DebugElement = fixture.debugElement.query(By.css('button'));
    
    expect(loginButton).not.toBeNull(); 
    loginButton.nativeElement.click(); 

    setTimeout(() => {
      expect(snackBar.open).toHaveBeenCalledWith('Senha incorreta!', 'Fechar', { duration: 3000 });
    }, 100);
  });

  it('should show error message on incorrect password', () => {
    authService.login.and.returnValue(throwError({ status: 401 }));

    component.username = 'admin';
    component.password = 'wrongpassword';

    fixture.detectChanges(); 

    const loginButton: DebugElement = fixture.debugElement.query(By.css('button'));
    
    expect(loginButton).not.toBeNull(); 
    loginButton.nativeElement.click(); 

    setTimeout(() => {
      expect(snackBar.open).toHaveBeenCalledWith('Senha incorreta!', 'Fechar', { duration: 3000 });
    }, 100);
  });
});