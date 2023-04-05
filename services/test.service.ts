import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable ()
export class TestService{
    constructor(private cookieService: CookieService){}

    isLogged: boolean = true;
    i: number = 0;

    testFunction(){
        const element = new Observable(observable=>{
            setTimeout(()=>{
                this.i = this.i += 1;
                observable.next(this.i)
            }, this.i*1000)
        })
        return element;
    }

    checkIfAthenticated()
    {
        const promise = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if(this.cookieService.get('sessionToken'))
                {
                    resolve(true)
                }
                else
                {
                    resolve(false)
                }
            }, 100, this.checkIfAthenticated())
        })
        return promise;
    }
}