import { Component, OnInit } from '@angular/core';
import { imagePaths } from './image-paths';
import { HttpClient } from '@angular/common/http';
import { Lightbox } from 'ngx-lightbox';
import { SharedDataService } from '../shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {

  imagePaths = imagePaths;
   _album: any[] = [];
   isLoading = true; 
   resultArray!: string[]

  selectedFile: File | null = null;

  constructor(private http: HttpClient,
    private lightbox: Lightbox,
    private sharedDataService: SharedDataService,
    private router: Router ) {
    for (let imagePath of this.imagePaths) {
      const src = imagePath;
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

   imageLoaded(): void {
    this.isLoading = false;
  }

  private trimImagePath(fullPath: string): string {
    return fullPath.replace('assets/tb/', '').replace(/\.\w+$/, '');
  }

  open(index: number): void {
    this.lightbox.open(this._album, index);
    const fullPath = this._album[index].src;
    const trimmedPath = this.trimImagePath(fullPath);
    console.log('Trimmed Image path:', trimmedPath);

    const objFilePath = `assets/3d/${trimmedPath}.obj`;

    console.log('objFilePath path:', objFilePath);


    this.readObjFile(objFilePath);
    this.onUpload()
  }
  
  readObjFile(objFilePath: string): void {
    const fileReader = new FileReader();
  
    fileReader.onload = (event) => {
      // Accéder au contenu du fichier sous forme de ArrayBuffer
      const arrayBuffer = event.target?.result as ArrayBuffer;
  
      // Créer un nouvel objet File avec le contenu du fichier
      const fileContent = new Uint8Array(arrayBuffer);
      const blob = new Blob([fileContent], { type: 'application/octet-stream' });
      
      const fileName = objFilePath.substring(objFilePath.lastIndexOf('/') + 1);
      this.selectedFile = new File([blob], fileName, { type: 'application/octet-stream' });
  
      // Tu peux maintenant utiliser this.selectedFile comme tu le souhaites
      console.log('Selected File:', this.selectedFile);
    };
  
    // Charger le fichier en tant que ArrayBuffer
    fetch(objFilePath)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => fileReader.readAsArrayBuffer(new Blob([arrayBuffer])));
  }
  

  close(): void {
    this.lightbox.close();
  }

  ngOnInit(): void {
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('model_file', this.selectedFile, this.selectedFile.name);

      this.http.post<any>('http://localhost:5000/find_similar', formData)
  .subscribe(response => {
    //console.log('Upload successful', response);

    response.forEach((item: { model_file_path: string; }) => {
      // Extract the model_file_path and push it into sharedResultArray
      console.log('Upload successful',item.model_file_path);
    });

    if (response) {
      // Initialize sharedResultArray as an empty array
      this.sharedDataService.sharedResultArray = [];

      // Loop through each item in the result array
      response.forEach((item: { model_file_path: string; }) => {
        // Extract the model_file_path and push it into sharedResultArray
        this.sharedDataService.sharedResultArray.push(item.model_file_path);
      });

      // Navigate to the result-search page
      this.router.navigate(['/result-search']);

      console.log('Result Array:', this.sharedDataService.sharedResultArray);
    }
  }, error => {
    console.error('Upload failed', error);
  });

    }
  }
  

}
