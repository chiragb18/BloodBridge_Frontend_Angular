import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { DonorDashboard } from './donor/dashboard/dashboard';
import { HospitalDashboard } from './hospital/dashboard/dashboard';
import { AdminDashboard } from './admin/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'admin/dashboard', component: AdminDashboard },
  { path: 'donor/dashboard', component: DonorDashboard },
  { path: 'hospital/dashboard', component: HospitalDashboard }
];

export class AppRoutingModule { }
