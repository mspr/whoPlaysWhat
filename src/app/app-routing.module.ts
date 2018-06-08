import { BandsShowComponent } from './bands/bands-show/bands-show.component';
import { BandsModule } from './bands/bands.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SongsModule } from './songs/songs.module';
import { MusiciansModule } from './musicians/musicians.module';
import { BandsAddComponent } from './bands/bands-add/bands-add.component';
import { BandsLayoutComponent } from './bands/bands-layout/bands-layout.component';
import { IncomingSongsModule } from './incoming-songs/incoming-songs.module';

const routes: Routes = [
  {
    path: 'bands',
    component: BandsLayoutComponent,
  },
  {
    path: 'bands/add',
    component: BandsAddComponent,
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
        path: 'incoming-songs',
        loadChildren: () => IncomingSongsModule
      },
      {
        path: '',
        component: BandsShowComponent,
      }
    ]
  },
  {
    path: '',
    redirectTo: 'bands',
    pathMatch: 'full'
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
