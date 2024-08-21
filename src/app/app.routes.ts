import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreatePollComponent } from './components/poll/create-poll/create-poll.component';

const privateRoutes: Routes = [
    { path: 'home', component: DashboardComponent},
    { path: 'create-poll', component: CreatePollComponent}
];

const publicRoutes: Routes = [
    { path: '*', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];

export const routes: Routes = [
    ...publicRoutes,
    ...privateRoutes
];