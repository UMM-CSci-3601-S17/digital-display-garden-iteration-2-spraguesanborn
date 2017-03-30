import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { AdminService } from "./admin.service";
import { Http } from '@angular/http';
import {Observable} from "rxjs";
import {QRCodeComponent} from 'angular2-qrcode';
@Component({
    selector: 'admin-component',
    templateUrl: 'admin.component.html'
})
export class AdminComponent {
    username: string;
    password: string;
    showConfirmation: boolean;
    @Input() multiple: boolean = false;
    @ViewChild('fileInput') inputEl: ElementRef;

    constructor(private adminService: AdminService, private http:Http) {}

    setUserPass(user, pass) : void{
        if(user != null && pass != null) {
            this.username = user;
            this.password = pass;
        }
    }

    // fileChange(event) {
    //     this.adminService.uploadFile(event);
    //     this.showConfirmation = true;
    // }

    // uploadFile() {
    //     let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    //     let fileCount: number = inputEl.files.length;
    //     let formData = new FormData();
    //     if (fileCount > 0) { // a file was selected
    //         for (let i = 0; i < fileCount; i++) {
    //             formData.append('file[]', inputEl.files.item(i));
    //         }
    //         this.http
    //             .post('localhost:4567/api/newFile', formData)
    //         // do whatever you do...
    //         // subscribe to observable to listen for response
    //             .catch(error => Observable.throw(error))
    //                     .subscribe(
    //                         data => console.log('success'),
    //                         error => console.log(error)
    //                     )
    //     }
    // }
}

