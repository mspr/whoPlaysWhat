import { IncomingSongsUpdateComponent } from './incoming-songs-update/incoming-songs-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomingSongsShowComponent } from './incoming-songs-show/incoming-songs-show.component';
import { IncomingSongsAddComponent } from './incoming-songs-add/incoming-songs-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'show',
    pathMatch: 'full'
  },
  {
    path: 'update',
    component: IncomingSongsUpdateComponent
  },
  {
    path: 'show',
    component: IncomingSongsShowComponent
  },
  {
    path: 'add',
    component: IncomingSongsAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IncomingSongsRoutingModule
{
}
