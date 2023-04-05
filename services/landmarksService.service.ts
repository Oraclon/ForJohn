import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Subject, map, tap } from "rxjs";

export class LandmarkModel
{
    objectId!: string;
    order!: number;
    title!: string;
    photo_thumb!: string;
    photo!: string;
    short_info!: string;
    url?:string;
    description!: string;
    wow?:boolean;
    private _hashTag!: string;

    set hashTag(value:string)
    {
        this._hashTag = value;
    }
    
    get hasTag()
    {
        const t:string = this._hashTag.replace(' ','').replace(',','').split(" ").join('');
        debugger
        return this._hashTag.replace(' ','').replace(',','').split(" ").join('');
    }
}

@Injectable({ providedIn:'root' })
export class LandmarksService
{
    constructor(private http:HttpClient){}

    Landmarks: LandmarkModel[] = [];
    Landmark= new Subject<LandmarkModel>;
    LandSub = new Subject<LandmarkModel[]>;
    ModalStatus = new EventEmitter<boolean>();

    MyHeaders = new HttpHeaders({
            
        'X-Parse-Application-Id': environment.APP_ID,
        // 'X-Parse-REST-API-Key': environment.MASTER_KEY,
        'Content-Type':  'application/json'
       })

    GetItems()
    {
        return this.http.get<{[key:string]:LandmarkModel}>
            (environment.GET_URL,
                {
                    headers: this.MyHeaders
                })
            .pipe(map(response=>{
                const DBLandmarks: any = response['results'];
                const LandmarkItems: LandmarkModel[] = []
                for(const key in DBLandmarks)
                {
                    var wow : boolean = Math.random() <= 0.5 ? true : false;
                    LandmarkItems.push({ ...DBLandmarks[key], wow: wow, hashTag:DBLandmarks[key].title, objectId: DBLandmarks[key]['objectId'] });
                }
                return LandmarkItems.sort((a,b)=>(a.order > b.order) ? 1 : -1);
            }),
            tap(response=>{ 
                this.LandSub.next(response);
                this.Landmarks = response
             })
            )
    }

    UpdateLandmark(SelectedItem: LandmarkModel)
    {
        return this.http.put(`${environment.GET_URL}/${SelectedItem.objectId}`, SelectedItem,
        {
            headers: this.MyHeaders,
            observe:'response'
        })
    }

    GetCarouselItems(Landmarks: LandmarkModel[]){
        const CarouselLandmarks: LandmarkModel[] = []
        Landmarks.forEach(x=>{
            if(x.wow){
                CarouselLandmarks.push(x)
            }
        })
        return CarouselLandmarks;
    }

    GetSelectedLandmark(ObjectId: string)
    {
        return this.Landmarks.find(x=> x.objectId == ObjectId )
        debugger
    }

    GetSideLandmarks(ObjectId: string)
    {
        const SideLandmarks: LandmarkModel[] = []
        this.Landmarks.forEach(x=>{
            if(x.objectId != ObjectId)
            {
                SideLandmarks.push(x);
            }
        })
        return SideLandmarks;
    }

}