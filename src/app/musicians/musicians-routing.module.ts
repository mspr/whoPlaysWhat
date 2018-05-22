import { MusiciansUpdateComponent } from './musicians-update/musicians-update.component';
import { MusiciansShowComponent } from './musicians-show/musicians-show.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusiciansListComponent } from './musicians-list/musicians-list.component';
import { MusiciansAddComponent } from './musicians-add/musicians-add.component';

const routes: Routes = [{
  children: [
  {
    path: "add",
    component: MusiciansAddComponent
  },
  {
    path: ":id/update",
    component: MusiciansUpdateComponent
  },
  {
    path: ":id",
    component: MusiciansShowComponent
  }],
  path: '',
  component: MusiciansListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusiciansRoutingModule { }
