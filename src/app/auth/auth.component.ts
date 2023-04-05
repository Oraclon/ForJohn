import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, UserDataModel } from 'services/authenticationService.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
  LoginForm!: FormGroup;
  ErrorMessage!: string;
  userDataModel!: UserDataModel;

  constructor(
        private cookie: CookieService,
        private router: Router,
        private active: ActivatedRoute,
        private authenticationService: AuthenticationService){}

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password': new FormControl(null,Validators.required)
    })

    if(this.cookie.get('LoggedUser'))
    {
      this.router.navigate(['/adminPage'])
    }
  }

  onSubmit()
  {
    this.userDataModel = new UserDataModel();
    this.authenticationService.LogUserIn(this.LoginForm.value).subscribe(
      response=>{
        this.userDataModel.data = <UserDataModel>response.body
        this.authenticationService.loginResposne.next(this.userDataModel);
        this.router.navigate(['/adminPage'])
      },
      error=>{
        this.ErrorMessage = error.error.error
      }
    );
  }
}
