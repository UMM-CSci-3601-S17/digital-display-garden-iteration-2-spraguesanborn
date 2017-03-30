import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class AdminService {
    private plantUrl: string = API_URL + "newFile";
    constructor(private http:Http) { }

    uploadFile(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let formData:FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            let headers = new Headers();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            let options = new RequestOptions({ headers: headers });
            this.http.post(this.plantUrl, formData, options)
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                    data => console.log('success'),
                    error => console.log(error)
                )
        }
}
