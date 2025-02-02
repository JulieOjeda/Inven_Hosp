import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GearViewComponent } from './components/gear/gear-view/gear-view.component';
import { GearViewCardComponent } from './components/gear/gear-view-card/gear-view-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GearFormComponent } from './components/gear/gear-form/gear-form.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GearViewComponent,
    GearViewCardComponent,
    GearFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
