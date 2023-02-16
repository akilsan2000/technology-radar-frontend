import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TechnologyAddComponent } from './technology-add/technology-add.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { TechnologyViewerComponent } from './technology-viewer/technology-viewer.component';
import { LoginComponent } from './login/login.component';
import { AdministrationComponent } from './administration/administration.component';
import { JwtInterceptor } from './_helpers';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { TechnologyEditComponent } from './technology-edit/technology-edit.component';
import { TechnologyPublishComponent } from './technology-publish/technology-publish.component';
import { TechnologyClassificationComponent } from './technology-classification/technology-classification.component';
import { TechnologyDetailsComponent } from './technology-details/technology-details.component';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { TechnologyHistoryComponent } from './technology-history/technology-history.component';

@NgModule({
  declarations: [
    AppComponent,
    TechnologyAddComponent,
    TechnologyViewerComponent,
    LoginComponent,
    AdministrationComponent,
    TechnologyEditComponent,
    TechnologyPublishComponent,
    TechnologyClassificationComponent,
    TechnologyDetailsComponent,
    LoginHistoryComponent,
    TechnologyHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
