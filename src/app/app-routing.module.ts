import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { LoginComponent } from './login/login.component';
import { TechnologyAddComponent } from './technology-add/technology-add.component';
import { TechnologyViewerComponent } from './technology-viewer/technology-viewer.component';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const routes: Routes = [
  { path: '', redirectTo: '/technology-viewer', pathMatch: 'full'},
  { path: 'technology-viewer', component: TechnologyViewerComponent, canActivate: [AuthGuard] },
  { path: 'technology-add', component: TechnologyAddComponent, canActivate: [AuthGuard], data: {roles: [Role.CTO]} },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard], data: {roles: [Role.CTO]} },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
