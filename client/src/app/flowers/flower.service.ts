import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs";
import { Flower } from "./flower";

@Injectable()
export class FlowerService {
    private bedUrl: string = API_URL + "beds";
    private flowerUrl: string = API_URL + "flowers";
    constructor(private http:Http) { }

    getFlower(garden: string, cultivar:string): Observable<any> {
        return this.http.request(this.flowerUrl + "?gardenLocation=" + garden + "&cultivar=" + cultivar).map(res => res.json());
    }

    getFlowerNames(garden: string): Observable<Flower[]> {
        return this.http.request(this.flowerUrl + "?gardenLocation=" + garden).map(res => res.json());
    }

    getBedNames(): Observable<any> {
        return this.http.request(this.bedUrl).map(res => res.json());
    }

    postComment(plantID: string, comment: string): Observable<Boolean> {
        let toInsert = {
            plantID: plantID,
            comment: comment
        };

        return this.http.post(this.flowerUrl + "/postComment", JSON.stringify(toInsert)).map(res => res.json());
    }

    incrementLikes(plantID: string): Observable<Boolean> {
        let toUpdate = {
            plantID: plantID
        };

        return this.http.put(this.flowerUrl + "/thumbsUp", JSON.stringify(toUpdate)).map(res => res.json());
    }

    incrementVisits(plantID: string): Observable<Boolean> {
        let toUpdate = {
            plantID: plantID
        };

        return this.http.put(this.flowerUrl + "/flowerVisits", JSON.stringify(toUpdate)).map(res => res.json());
    }

    uploadFile(event): void {
        console.log("Uploading file");
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            let headers = new Headers();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            let options = new RequestOptions({headers: headers});
            this.http.post(this.flowerUrl, formData, options)
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                    data => console.log('success'),
                    error => console.log(error)
                )
        }
    }
}