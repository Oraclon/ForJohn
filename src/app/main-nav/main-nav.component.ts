import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService, UserDataModel } from 'services/authenticationService.service';
import { LandmarkModel, LandmarksService } from 'services/landmarksService.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{
  searchText:string = ''
  myItems: LandmarkModel[] = []

  LoggedUserMenuIsActive: boolean = false;
  UserIsLogged: boolean = false;

  ResponsiveMenuAreaStatus: boolean = false;
  ResponsiveSearchAreaStatus: boolean = false;

  constructor(private router: Router,
    private cookie: CookieService,
    private authService: AuthenticationService,
    private landmarksService: LandmarksService){}

    ngOnInit(): void {
      

    //Get landmarks in order to filter them with pipe
    this.landmarksService.GetItems().subscribe(Landmarks=>{
      this.myItems = Landmarks;
    })

    //On Each reload check if cookie exists
    const item: UserDataModel = new UserDataModel();
    if(this.cookie.get('LoggedUser')){
      item.cookieData = JSON.parse(this.cookie.get('LoggedUser'));
      if(item.isLogged){
        this.UserIsLogged = item.isLogged;
      }
    }
    
    //Trigger this event in case of successfull login
    this.authService.loginResposne.subscribe((response:any)=>{ 
      if(response._isLoggedIn)
      {
        debugger
        this.UserIsLogged = response._isLoggedIn;
        this.cookie.set('LoggedUser', JSON.stringify(response));
      }
      else
      {
        this.UserIsLogged = response;
      }
     })
  
    }

    RedirectToLandmark(item: LandmarkModel)
    {
      this.searchText = '';
      this.ResponsiveSearchAreaStatus = false;
      this.router.navigate(['/landmark', item.objectId])
    }

  ControlUserMenu(value: string){
    this.LoggedUserMenuIsActive = !this.LoggedUserMenuIsActive;
    switch(value){
      case 'admin':
        this.router.navigate(['/auth']);
        debugger
        break;
      case 'logout':
        this.authService.LogUserOut()
        this.ResponsiveMenuAreaStatus = false;
        debugger
        break;
    }
  }

  HandleResponsiveMenu(){
    this.ResponsiveMenuAreaStatus = !this.ResponsiveMenuAreaStatus;
  }
  HandleResponsiveSearch(){
    this.ResponsiveSearchAreaStatus = !this.ResponsiveSearchAreaStatus;
  }
}
