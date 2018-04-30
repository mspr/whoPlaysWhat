import { BandsModule } from './bands/bands.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SongsModule } from './songs/songs.module';

const routes: Routes = [{
    path: '',
    redirectTo: 'bands',
    pathMatch: 'full'
  },
  {
    path: 'bands/:id/songs',
    loadChildren: () => SongsModule,
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
