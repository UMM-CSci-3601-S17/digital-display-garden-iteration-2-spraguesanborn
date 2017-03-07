import { FlowerService } from "./flower.service";
import { Flower } from "./flower";
import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Feedback } from './feedback';



@Component({
    templateUrl: 'flower.component.html',
    styles: ['button.responseButton { border: 2px solid #4CAF50; width: 49%; height: 60px}',
        'span.glyphicon {font-size: 40px;}', 'input.commentBox {width: 99%; font-size: 200%; height: 80px;border: 2px solid #4CAF50;}',
        'button.submitButton {width: 60%; height:60px; border: 2px solid #4CAF50; font-size: 40px;' +
        ' display: block; margin: auto;}', 'div.fullComment {width: 99%; margin: auto;}', 'hr.flowerPageHR {border: 1px solid #4CAF50;}'],
    selector: 'my-app',
})

// Component class
export class FlowerComponent implements OnInit{
    public bedNames: string[];
    public flowerNames: string[];
    public text: string;
    public myForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes

    constructor(private flowerService: FlowerService, private _fb: FormBuilder) {
        // this.users = this.userListService.getUsers();
    }

    private parseFlowers(flowers: Flower[]) {
        var tempNames: string[] = [];
        for (let each of flowers) {
            tempNames.push(each.cultivar);
        }
        return tempNames;

    }

    ngOnInit(): void {
        this.flowerService.getBedNames().subscribe(
            beds => this.bedNames = Object.keys(beds),
            err => {
                console.log(err);
            }
        );
        this.myForm = this._fb.group({
            comment: ['', [<any>Validators.required]],
        });
    }

    onSelect(bed: string): void {
        this.flowerService.getFlowerNames(bed).subscribe(
            flowers => this.flowerNames = this.parseFlowers(flowers),
            err => {
                console.log(err);
            }
        );
    }

    save(model: Feedback, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }

}



