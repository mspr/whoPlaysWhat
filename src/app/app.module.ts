import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MusiciansShowComponent } from './musicians/musicians-show/musicians-show.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BandsModule } from './bands/bands.module';


@NgModule({
  declarations: [
    AppComponent,
    MusiciansShowComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BandsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
