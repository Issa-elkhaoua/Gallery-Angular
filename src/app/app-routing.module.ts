import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResultSearchComponent } from './result-search/result-search.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';



const routes: Routes = [
  { path: 'result-search', component: ResultSearchComponent },
  { path: '', component: PhotoGalleryComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
