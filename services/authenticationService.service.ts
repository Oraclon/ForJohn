import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Subject, exhaustMap, take } from "rxjs";
import { environment } from "src/environments/environment";

export class LoginModel
{
    username!: string;
    password!: string;
}

export class UserDataModel
{
    username?:string;
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
    objectId!:string;
    sessionToken!:string;
    emailVerified!: boolean;
    private _isLoggedIn: boolean = false;

    set data(data: UserDataModel)
    {
        this.UpdateSelf(data);
        this._isLoggedIn = true;
    }
    set cookieData(data: UserDataModel)
    {
        this.UpdateSelf(data);
        this._isLoggedIn = data._isLoggedIn;
    }

    get isLogged()
    {
        return this._isLoggedIn;
    }

    UpdateSelf(data: UserDataModel){
        this.username = data.username;
        this.phone = data.phone;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.objectId = data.objectId;
        this.sessionToken = data.sessionToken;
        this.emailVerified = data.emailVerified;
    }
    
}

@Injectable({ providedIn:'root' })

export class AuthenticationService
{
    loginResposne = new Subject;
    GuardResponse = new Subject<UserDataModel>;
    test= new Subject

    constructor(
        private http: HttpClient,
        private router: Router,
        private cookie: CookieService
    ){}

    MyHeaders = new HttpHeaders({
        'X-Parse-Application-Id':environment.APP_ID,
        // 'X-Parse-REST-API-Key':environment.MASTER_KEY,
        'Content-Type':'application/json'
       })

    LogUserIn(data: LoginModel)
    {
        const userData: UserDataModel = new UserDataModel();
        return this.http.post<UserDataModel>(environment.LOGIN_URL, data, {
            headers: this.MyHeaders,
            observe: 'response'
        });
    }


    LogUserOut()
    {
        const obj = { id:1, pass:2 }
        this.http.post(environment.LOGOUT_URL, obj,{
            headers: this.MyHeaders
        }).subscribe(response=>{
            
            this.cookie.delete('LoggedUser')
            this.loginResposne.next(false);
            this.router.navigate(['/home'])
        })
    }
}