import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class HomeService {
    private userUrl: string = API_URL + "beds";
    constructor(private http:Http) { }

    getBeds(): Observable<any> {
        return this.http.request(this.userUrl).map(res => res.json());
    }
}