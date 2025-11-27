import { Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { CohorteGenComponent } from './pages/cohorte-gen/cohorte-gen.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EgresadosComponent } from './pages/egresados/egresados.component';
import { LgyacComponent } from './pages/lgyac/lgyac.component';
import { NucleoBasicoComponent } from './pages/nucleo-basico/nucleo-basico.component';
import { ProductividadLgyacComponent } from './pages/productividad-lgyac/productividad-lgyac.component';
import { ProductividadTablasComponent } from './pages/productividad-tablas/productividad-tablas.component';
import { RequisitosGradoComponent } from './pages/requisitos-grado/requisitos-grado.component';
import { RequisitosIngresoComponent } from './pages/requisitos-ingreso/requisitos-ingreso.component';
import { RequisitosPermanenciaComponent } from './pages/requisitos-permanencia/requisitos-permanencia.component';
import { SintesisPlanComponent } from './pages/sintesis-plan/sintesis-plan.component';
import { LoginComponent } from './pages/login/login.component';

import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'index', component: IndexComponent, canActivate: [authGuard] },
  { path: 'cohorte-gen', component: CohorteGenComponent, canActivate: [authGuard] },
  { path: 'contacto', component: ContactoComponent, canActivate: [authGuard] },
  { path: 'egresados', component: EgresadosComponent, canActivate: [authGuard] },
  { path: 'lgyac', component: LgyacComponent, canActivate: [authGuard] },
  { path: 'nucleo-basico', component: NucleoBasicoComponent, canActivate: [authGuard] },
  { path: 'productividad-lgyac', component: ProductividadLgyacComponent, canActivate: [authGuard] },
  { path: 'productividad-tablas', component: ProductividadTablasComponent, canActivate: [authGuard] },
  { path: 'requisitos-grado', component: RequisitosGradoComponent, canActivate: [authGuard] },
  { path: 'requisitos-ingreso', component: RequisitosIngresoComponent, canActivate: [authGuard] },
  { path: 'requisitos-permanencia', component: RequisitosPermanenciaComponent, canActivate: [authGuard] },
  { path: 'sintesis-plan', component: SintesisPlanComponent, canActivate: [authGuard] },
];
