import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService, UserDataModel } from "./authenticationService.service";
import { CookieService } from "ngx-cookie-service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationGuard implements CanActivate
{
    constructor(
        private authenticationService : AuthenticationService,
        private cookie: CookieService,
        private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const UserData: UserDataModel = new UserDataModel();
        UserData.cookieData = JSON.parse(this.cookie.get('LoggedUser'));    
        //TODO: on userDatamodel add logged in date and time
        //in order to generate a pseudo expire by adding two days
        //of the expiration. Of course o could do that from the cookie
        //but that would not be fun.
        if(UserData.isLogged){
            return true;
        }
        else{
            this.router.navigate(['/home'])
            return false;
        }
    }
}