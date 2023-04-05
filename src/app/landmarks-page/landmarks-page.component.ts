import { Component, Input, OnInit } from '@angular/core';
import { LandmarksService, LandmarkModel } from 'services/landmarksService.service';

@Component({
  selector: 'app-landmarks-page',
  templateUrl: './landmarks-page.component.html',
  styleUrls: ['./landmarks-page.component.scss']
})
export class LandmarksPageComponent implements  OnInit{
  constructor(private landmarksService: LandmarksService){}
  @Input() TitleIsEnabled: boolean = true;

  landmarkItems: LandmarkModel[] = []

  ngOnInit(): void {
    this.landmarksService.GetItems().subscribe(Landmarks=>{
      this.landmarkItems = Landmarks;
    })
  }
}
