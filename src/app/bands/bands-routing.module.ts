import { BandsLayoutComponent } from './bands-layout/bands-layout.component';
import { BandsAddComponent } from './bands-add/bands-add.component';
import { BandsShowComponent } from './bands-show/bands-show.component';
import { BandsListComponent } from './bands-list/bands-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongsModule } from '../songs/songs.module';

const routes: Routes = [{
  children: [
  {
    path: "add",
    component: BandsAddComponent
  },
  {
    path: ':id/songs',
    loadChildren: () => SongsModule,
  },
  {
    path: ':id',
    redirectTo: ':id/songs',
    pathMatch: 'full'
  }],
  path: '',
  component: BandsLayoutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BandsRoutingModule { }
