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

export const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },

  // LOGIN
  { path: 'Login', component: LoginComponent },

  // PANEL PRINCIPAL (antes /Dashboard)
  { path: 'panel', component: DashboardComponent },

  // PÁGINAS DEL ADMIN
  { path: 'index', component: IndexComponent },
  { path: 'CohorteGen', component: CohorteGenComponent },
  { path: 'Contacto', component: ContactoComponent },
  { path: 'Egresados', component: EgresadosComponent },
  { path: 'lgyac', component: LgyacComponent },
  { path: 'NucleoBasico', component: NucleoBasicoComponent },
  { path: 'ProductividadLGyAC', component: ProductividadLgyacComponent },
  { path: 'ProductividadTablas', component: ProductividadTablasComponent },
  { path: 'RequisitosGrado', component: RequisitosGradoComponent },
  { path: 'RequisitosIngreso', component: RequisitosIngresoComponent },
  { path: 'RequisitosPermanencia', component: RequisitosPermanenciaComponent },
  { path: 'SintesisPlan', component: SintesisPlanComponent },
];
