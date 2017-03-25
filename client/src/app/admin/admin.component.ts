import { Component, OnInit } from '@angular/core';
import {AdminService} from "./admin.service";

@Component({
    selector: 'admin-component',
    templateUrl: 'admin.component.html'
})
export class AdminComponent {
    username: string;
    password: string;
    showConfirmation: boolean;

    constructor(private adminService: AdminService) {}

    setUserPass(user, pass) : void{
        if(user != null && pass != null) {
            this.username = user;
            this.password = pass;
        }
    }

    fileChange(event) {
        this.adminService.uploadFile(event);
        this.showConfirmation = true;
    }
}

