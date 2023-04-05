import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { UserDataModel } from "services/authenticationService.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor
{
    constructor(private cook: CookieService){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        const token = this.cook.get('LoggedUser') ? JSON.parse(this.cook.get('LoggedUser')).sessionToken : '';
        //TODO: on userDatamodel add logged in date and time
        //in order to generate a pseudo expire by adding two days
        //of the expiration. Of course o could do that from the cookie
        //but that would not be fun.
        const modified = req.clone({ headers:req.headers.append('X-Parse-Session-Token', token)});
        return next.handle(modified);
    }
}