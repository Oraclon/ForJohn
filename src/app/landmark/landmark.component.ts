import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'; 
import { LandmarksService, LandmarkModel } from 'services/landmarksService.service';

@Component({
  selector: 'app-landmark',
  templateUrl: './landmark.component.html',
  styleUrls: ['./landmark.component.css']
})
export class LandmarkComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private landmarksService: LandmarksService){}

  public LandmarkData: any;
  public SideLandmarks: LandmarkModel[] = []
  
  ngOnInit(): void {
      this.route.params.subscribe((param:Params)=>{
        this.LandmarkData = this.landmarksService.GetSelectedLandmark(param['object_id']);
        this.SideLandmarks = this.landmarksService.GetSideLandmarks(param['object_id']);
        debugger
      })
  }
}
