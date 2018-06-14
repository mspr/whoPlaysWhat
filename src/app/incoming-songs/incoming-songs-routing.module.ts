import { IncomingSongsUpdateComponent } from './incoming-songs-update/incoming-songs-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomingSongsShowComponent } from './incoming-songs-show/incoming-songs-show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'details',
    pathMatch: 'full'
  },
  {
    path: 'update',
    component: IncomingSongsUpdateComponent
  },
  {
    path: 'details',
    component: IncomingSongsShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomingSongsRoutingModule { }
