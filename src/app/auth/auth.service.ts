import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators"
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.development";

export interface ResponseInterface{
    createdAt: string;
    emailVerified: boolean;
    objectId: string;
    sessionToken: string;
    username: string;
    updatedAt: string;
}

export class UserModel
{
    createdAt!: string;
    emailVerified!: boolean;
    objectId!: string;
    sessionToken!: string;
    username!: string;
    updatedAt!: string;
    isAuthenticated: boolean = false;
}

export interface LoginInterface{
    username: string;
    password: string;
}
@Injectable({
    providedIn:'root'
})
export class AuthService
{
    constructor(
        private http: HttpClient, 
        private cookieService: CookieService,
        private router: Router
         ){
            if(this.cookieService.get('sessionToken'))
            {
                this.UserIsLogged.emit(true)
            }
    }

    UserSubject = new Subject<UserModel>;
    UserIsLogged = new EventEmitter<boolean>();
    UserIsLoggedOut = new EventEmitter<boolean>();

    public MyHeaders = new HttpHeaders({
            
        'X-Parse-Application-Id': environment.APP_ID,
        'X-Parse-REST-API-Key': environment.MASTER_KEY,
        'Content-Type':  'application/json'
       })
    
       onLogin(LoginData: LoginInterface)
       {
        return this.http.post<ResponseInterface>(environment.LOGIN_URL, LoginData,
            {
                headers: this.MyHeaders
            }
        ).pipe(
            tap(response=>{
                const userModel = new UserModel();
                userModel.username = response.username;
                userModel.createdAt = response.createdAt;
                userModel.emailVerified = response.emailVerified;
                userModel.objectId = response.objectId;
                userModel.sessionToken = response.sessionToken;
                userModel.updatedAt = response.updatedAt
                userModel.isAuthenticated = true;
                this.UserSubject.next(userModel);
            }))
       }

       onLogout()
       {
        const obj = {id:1,pass:2}

        this.http.post(environment.LOGOUT_URL, obj,{
            headers: this.MyHeaders
        }).subscribe(res=>{
            this.cookieService.delete('sessionToken');
            
            if(!this.cookieService.get('sessionToken'))
            {
                this.UserIsLoggedOut.emit(true)
                this.router.navigate(['/home'])
            }
        })
       }
}