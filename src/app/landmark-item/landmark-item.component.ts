import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'services/authenticationService.service';
import { LandmarkModel } from 'services/landmarksService.service';

@Component({
  selector: 'app-landmark-item',
  templateUrl: './landmark-item.component.html',
  styleUrls: ['./landmark-item.component.scss']
})
export class LandmarkItemComponent{
  constructor(private router: Router,
    private cookie: CookieService,
    private authService: AuthenticationService){}
  UserIsLogged: boolean = false;
  ModalIsOpen: boolean = false;
  @Input() LandmarkData!: LandmarkModel;

  RedirectToLandmark()
  {
    this.router.navigate(['/landmark', this.LandmarkData.objectId ])
  }

  EditLandmark(){
    debugger
    this.router.navigate(['/adminPage'], { queryParams:{ objectId:this.LandmarkData.objectId } })
  }
  
  HandleModal()
  {
    this.ModalIsOpen = !this.ModalIsOpen
  }

  ngOnInit(): void {
    
    if(this.cookie.get('LoggedUser') && JSON.parse(this.cookie.get('LoggedUser'))._isLoggedIn)
    {
      this.UserIsLogged = true;
    }else{
      this.UserIsLogged = false;
    }
  }
}
