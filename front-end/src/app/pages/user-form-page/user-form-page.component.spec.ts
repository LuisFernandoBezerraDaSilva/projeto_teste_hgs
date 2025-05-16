import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UserFormPageComponent } from './user-form-page.component';

describe('UserFormPageComponent', () => {
  let component: UserFormPageComponent;
  let fixture: ComponentFixture<UserFormPageComponent>;

  beforeEach(async () => {
    const activatedRouteSpy = { snapshot: { params: {} } }; // Mock básico do ActivatedRoute

    await TestBed.configureTestingModule({
      imports: [UserFormPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy } // Adicionado mock do ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});