import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.css']
})
export class ResultSearchComponent implements OnInit{

  resultArray!: string[];

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    // Accède au tableau partagé depuis le service
    this.resultArray = this.sharedDataService.sharedResultArray;
  }

}
