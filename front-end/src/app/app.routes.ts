import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './guards/auth.guard';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { UserFormPageComponent } from './pages/user-form-page/user-form-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'tasks', component: TaskPageComponent, canActivate: [authGuard] },
  { path: 'users', component: UserFormPageComponent },
  { path: '**', redirectTo: '' }
];