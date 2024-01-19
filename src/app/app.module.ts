import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { LightboxModule } from 'ngx-lightbox';
import { ResultSearchComponent } from './result-search/result-search.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PhotoGalleryComponent,
    ResultSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LightboxModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
