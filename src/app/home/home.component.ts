import { Component, OnInit } from '@angular/core';
import { LandmarksService, LandmarkModel } from 'services/landmarksService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private landmarksService: LandmarksService){}
  carouselSlides: LandmarkModel[] = []

  ngOnInit(): void {
    this.landmarksService.LandSub.subscribe(Landmarks=>{
      this.carouselSlides = this.landmarksService.GetCarouselItems(Landmarks);
    })
    
  }
}
