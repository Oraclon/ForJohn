import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'services/authenticationService.service';
import { LandmarkModel, LandmarksService } from 'services/landmarksService.service';
import { ActivatedRoute } from '@angular/router';
import { Params } from 'express-serve-static-core';
import { url } from 'inspector';

class ResponseModel
{
  status!: number;
  message!: string;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})

export class AdminPageComponent implements OnInit{

  responseModel: ResponseModel = new ResponseModel()
  formStructure!: FormGroup;
  LandmarkItems: LandmarkModel[] = []
  LandmarkItem!: LandmarkModel;

  constructor( 
    private cookie: CookieService,
    private landmarksService: LandmarksService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.landmarksService.GetItems().subscribe(Landmarks=> this.LandmarkItems = Landmarks);

    this.formStructure = new FormGroup({
      'objectId' : new FormControl(null),
      'title' : new FormControl(null, Validators.required),
      'short_info' : new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'photo' : new FormControl(null, Validators.required),
      'url' : new FormControl(null, Validators.required),
    })

    this.activatedRoute.queryParams.subscribe((params:any)=>{
      this.landmarksService.GetItems().subscribe(response=>{
        const t = response.find(x=>x.objectId == params['objectId'])
        this.formStructure.patchValue({
          'title': t?.title,
          'short_info':t?.short_info,
          'description':t?.description,
          'photo':t?.photo,
          'url':t?.url
        });
        
      });
      
    })
  }

  onUpdate()
  {
    this.landmarksService.UpdateLandmark(this.formStructure.value)
    .subscribe(response=>{
      this.responseModel.status = response.status
      this.responseModel.message = this.formStructure.value.title;
      this.formStructure.reset()
    },
    error=>{
      this.responseModel.status = error.status
      this.responseModel.message = error.message
    });
  }

  onSelect(selected: LandmarkModel)
  {
    this.formStructure.patchValue(selected);
  }
}
