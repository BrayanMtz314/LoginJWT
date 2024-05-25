import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EventoComponent } from './components/evento/evento.component';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: 'inicio', component: DashboardComponent},
    {path: 'iniciar-sesion', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'evento/:id', component: EventoComponent}
];
