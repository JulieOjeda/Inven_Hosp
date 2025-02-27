import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GearViewComponent } from './components/gear/gear-view/gear-view.component';
import { GearViewCardComponent } from './components/gear/gear-view-card/gear-view-card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GearFormComponent } from './components/gear/gear-form/gear-form.component';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
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
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from '@angular/material/select';
import { AreaCardViewComponent } from './components/areas/area-card-view/area-card-view.component';
import { ReportTaskComponent } from './components/report/report-task/report-task.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NotificationComponent } from './shared/components/notification/notification.component';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {authInterceptor} from './shared/utils/interceptor/auth.interceptor';
import {authGuard} from './shared/guard/auth.guard';
import { GearNotificationComponent } from './components/gear/gear-notification/gear-notification.component';

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
    CamelCaseToNormalPipe,
    AreaCardViewComponent,
    ReportTaskComponent,
    NotificationComponent,
    GearNotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    MatButtonModule,
    MatOption,
    MatSelect,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    DragDropModule
  ],
  providers: [provideHttpClient(
    withInterceptors([authInterceptor])
  ), provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
