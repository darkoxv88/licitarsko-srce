import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicitarskoSrceComponent } from './modules/licitarsko-srce/licitarsko-srce.component';
import { AboutComponent } from './modules/licitarsko-srce/about/About.component';

const routes: Routes = [
  { path: '', component: LicitarskoSrceComponent },
  { path: 'About', component: AboutComponent },
  { path: '**', redirectTo: 'About' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
