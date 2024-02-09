import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.css']
})
export class ResultSearchComponent implements OnInit{

  resultArray!: string[];
  _album: any[] = [];
  isLoading = true; 

  constructor(private sharedDataService: SharedDataService,
    private lightbox: Lightbox,
    ) {
    this.resultArray = this.sharedDataService.sharedResultArray;
    for (let imagePath of this.resultArray) {
      const imagePathWithJpg = imagePath.replace('.obj', '.jpg');
  
  const src = `assets/tb/${imagePathWithJpg}`;
      const caption = 'Image caption here';
      const thumb = imagePath;
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this._album.push(album);
    }

  }

  ngOnInit(): void {
    this.resultArray = this.sharedDataService.sharedResultArray;
  }


  imageLoaded(): void {
    this.isLoading = false;
  }

  open(index: number): void {
    this.lightbox.open(this._album, index);
    const fullPath = this._album[index].src;
    // const trimmedPath = this.trimImagePath(fullPath);
    // console.log('Trimmed Image path:', trimmedPath);

    // const objFilePath = `assets/3d/${trimmedPath}.obj`;

    // console.log('objFilePath path:', objFilePath);



  }

}
