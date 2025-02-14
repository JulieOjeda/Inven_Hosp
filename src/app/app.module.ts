import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GearViewComponent } from './components/gear/gear-view/gear-view.component';
import { GearViewCardComponent } from './components/gear/gear-view-card/gear-view-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GearFormComponent } from './components/gear/gear-form/gear-form.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { GearListComponent } from './components/gear/gear-list/gear-list.component';
import { GearFilterComponent } from './components/gear/gear-filter/gear-filter.component';
import { GearBoardComponent } from './components/gear/gear-board/gear-board.component';
import { AreasBoardComponent } from './components/areas/areas-board/areas-board.component';
import { ReportBoardComponent } from './components/report/report-board/report-board.component';
import { FallbacksrcPipe } from './pipes/fallbacksrc.pipe';
import { CamelCaseToNormalPipe } from './pipes/camel-case-to-normal.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatStep} from '@angular/material/stepper';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    GearViewComponent,
    GearViewCardComponent,
    GearFormComponent,
    HomeComponent,
    LoginComponent,
    LandingComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    GearListComponent,
    GearFilterComponent,
    GearBoardComponent,
    AreasBoardComponent,
    ReportBoardComponent,
    FallbacksrcPipe,
    CamelCaseToNormalPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatStep,
    MatFormField,
    MatLabel,
    BrowserAnimationsModule,
    RouterModule,
    CarouselModule,
    MatError,
    MatIconModule,
    MatInputModule,
    MatToolbar,
    MatButtonModule
  ],
  providers: [provideHttpClient(), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
