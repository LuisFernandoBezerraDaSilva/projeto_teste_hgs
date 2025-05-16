import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TaskFormPageComponent } from './task-form-page.component';

describe('TaskFormPageComponent', () => {
  let component: TaskFormPageComponent;
  let fixture: ComponentFixture<TaskFormPageComponent>;

  beforeEach(async () => {
    const activatedRouteSpy = { snapshot: { params: {} } }; // Mock básico do ActivatedRoute

    await TestBed.configureTestingModule({
      imports: [TaskFormPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy } // Adicionado mock do ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});