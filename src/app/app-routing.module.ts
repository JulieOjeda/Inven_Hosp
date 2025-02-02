import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearViewComponent } from './components/gear/gear-view/gear-view.component';
import { GearFormComponent } from './components/gear/gear-form/gear-form.component';

const routes: Routes = [
  { path: '', component: GearFormComponent },
  { path: 'gear/:id', component: GearViewComponent }, // Ruta de éxito
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
