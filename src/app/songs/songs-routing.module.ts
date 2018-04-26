import { SongsShowComponent } from './songs-show/songs-show.component';
import { SongsAddComponent } from './songs-add/songs-add.component';
import { SongsListComponent } from './songs-list/songs-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: SongsListComponent,
  children: [
  {
    path: "add",
    component: SongsAddComponent
  },
  {
    path: ":id",
    component: SongsShowComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
