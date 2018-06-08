import { IncomingSongsUpdateComponent } from './incoming-songs-update/incoming-songs-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomingSongsListComponent } from './incoming-songs-list/incoming-songs-list.component';

const routes: Routes = [{
  path: '',
  component: IncomingSongsUpdateComponent,
  children: [
  {
    path: "update",
    component: IncomingSongsUpdateComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomingSongsRoutingModule { }
