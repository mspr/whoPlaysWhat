import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavigationService } from './navigation.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule
  ],
  exports: [
    NavbarComponent
  ],
  declarations: [NavbarComponent],
  providers: [
    NavigationService
  ]
})
export class CoreModule { }
