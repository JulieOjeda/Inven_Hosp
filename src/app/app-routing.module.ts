import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GearViewComponent } from './components/gear/gear-view/gear-view.component';
import { GearFormComponent } from './components/gear/gear-form/gear-form.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { GearBoardComponent } from './components/gear/gear-board/gear-board.component';
import { AreasBoardComponent } from './components/areas/areas-board/areas-board.component';
import { ReportBoardComponent } from './components/report/report-board/report-board.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,  // Usa el layout con sidebar y navbar
    children: [
      {
        path: 'board/gear',
        component : GearBoardComponent,
      },
      {
        path: 'board/gear/register',
        component : GearFormComponent,
      },
      {
        path: 'board/areas',
        component : AreasBoardComponent,
      },
      {
        path: 'board/report',
        component : ReportBoardComponent,
      },
      {
        path: 'board/gear/:id',
        component : GearViewComponent
      }
    ]
  },
  {
    path : "logout",
    component : LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
