import { Component } from '@angular/core';

@Component({
    templateUrl: 'flower.component.html'
})

// Component class
export class FlowerComponent {
    public text: string;

    constructor() {
        this.text = "More Placeholder Text";
    }
}