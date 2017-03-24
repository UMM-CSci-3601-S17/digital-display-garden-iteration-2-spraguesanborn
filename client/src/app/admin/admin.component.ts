/**
 * Created by hamme503 on 3/24/17.
 */
import { Component, OnInit } from '@angular/core';
import { FlowerService } from "../flowers/flower.service";

@Component({
    selector: 'administration-component',
    templateUrl: 'administration.component.html'
})
export class AdministrationComponent{


    username: string;
    password: string;
    showConfirmation: boolean;

    constructor(private flowerService: FlowerService) {}

    setUserPass(user, pass) : void{
        if(user != null && pass != null) {
            this.username = user;
            this.password = pass;
        }
    }

    fileChange(event) {
        this.flowerService.uploadFile(event);
        this.showConfirmation = true;
    }

}