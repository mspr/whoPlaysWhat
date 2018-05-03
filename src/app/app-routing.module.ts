import { BandsShowComponent } from './bands/bands-show/bands-show.component';
import { BandsModule } from './bands/bands.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SongsModule } from './songs/songs.module';
import { MusiciansModule } from './musicians/musicians.module';

const routes: Routes = [{
    path: '',
    redirectTo: 'bands',
    pathMatch: 'full'
  },
  {
    path: 'bands/:id',
    children: [{
      path: 'musicians',
      loadChildren: () => MusiciansModule
    },
    {
      path: 'songs',
      loadChildren: () => SongsModule
    },
    {
      path: '',
      component: BandsShowComponent,
    }]
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
