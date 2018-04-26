import { BandsModule } from './bands/bands.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'bands',
    pathMatch: 'full'
  },
  {
    path: 'bands',
    loadChildren: () => BandsModule,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
