import { Component, Input, Output, EventEmitter, ElementRef} from '@angular/core';

@Component({
    templateUrl: 'flower.component.html',
    styles: ['button.responseButton { border: 2px solid #4CAF50; width: 49%; height: 60px}',
        'span.glyphicon {font-size: 40px;}', 'input.commentBox {width: 99%; font-size: 200%; height: 80px;border: 2px solid #4CAF50;}',
        'button.submitButton {width: 60%; height:60px; border: 2px solid #4CAF50; font-size: 40px;' +
        ' display: block; margin: auto;}', 'div.fullComment {width: 99%; margin: auto;}', 'hr.flowerPageHR {border: 1px solid #4CAF50;}']
})

// Component class
export class FlowerComponent {
    public text: string;


    constructor() {
        this.text = "Information about flower";
    }

}



