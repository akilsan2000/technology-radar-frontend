import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { LoginComponent } from './login/login.component';
import { TechnologyAddComponent } from './technology-add/technology-add.component';
import { TechnologyClassificationComponent } from './technology-classification/technology-classification.component';
import { TechnologyDetailsComponent } from './technology-details/technology-details.component';
import { TechnologyEditComponent } from './technology-edit/technology-edit.component';
import { TechnologyPublishComponent } from './technology-publish/technology-publish.component';
import { TechnologyViewerComponent } from './technology-viewer/technology-viewer.component';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const routes: Routes = [
  { path: '', redirectTo: '/technology-viewer', pathMatch: 'full'},
  { path: 'technology-viewer', component: TechnologyViewerComponent, canActivate: [AuthGuard] },
  { path: 'technology-add', component: TechnologyAddComponent, canActivate: [AuthGuard], data: {roles: [Role.CTO]} },
  { path: 'technology-edit/:id', component: TechnologyEditComponent, canActivate: [AuthGuard], data: {roles: [Role.CTO]} },
  { path: 'technology-publish/:id', component: TechnologyPublishComponent, canActivate: [AuthGuard], data: {roles: [Role.CTO]} },
  { path: 'technology-classification/:id', component: TechnologyClassificationComponent, canActivate: [AuthGuard], data: {roles: [Role.CTO]} },
  { path: 'technology-details/:id', component: TechnologyDetailsComponent, canActivate: [AuthGuard], data: {roles: [Role.CTO]} },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard], data: {roles: [Role.CTO]} },
  { path: 'login-history', component: LoginHistoryComponent, canActivate: [AuthGuard], data: {roles: [Role.CTO]} },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
