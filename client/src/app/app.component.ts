import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Feedback } from './feedback';


@Component({
    selector: 'app',
    //moduleId: module.id,
    templateUrl: 'app.component.html'
})

// App Component class
export class AppComponent implements OnInit {
    public myForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes

    constructor(private _fb: FormBuilder) { } // form builder simplify form initialization

    ngOnInit() {
        this.myForm = this._fb.group({
            comment: ['', [<any>Validators.required]],
        });
    }

    save(model: Feedback, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }





}

