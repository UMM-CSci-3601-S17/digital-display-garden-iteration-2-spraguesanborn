import { Component, Input, Output, EventEmitter, ElementRef} from '@angular/core';

@Component({
    templateUrl: 'flower.component.html',
    styles: ['button.responseButton { border: 2px solid #4CAF50; width: 49%; height: 60px}',
        'span.glyphicon {font-size: 40px;}', 'textarea.commentBox {width: 99%; font-size: 200%; height: 80px;border: 2px solid #4CAF50;}',
        'input.submitButton {width: 60%; height:60px; border: 2px solid #4CAF50; font-size: 40px;' +
        ' display: block; margin: auto;}', 'div.fullComment {width: 90%; margin: auto;}']
})

// Component class
export class FlowerComponent {
    public text: string;

    constructor() {
        this.text = "Information about flower";
    }
}


// http://stackoverflow.com/questions/34736161/how-do-i-create-a-dropdown-component-in-angular-2
// export class DropdownValue {
//     value:string;
//     label:string;
//
//     constructor(value:string,label:string) {
//         this.value = value;
//         this.label = label;
//     }
// }
//
// @Component({
//     selector: 'dropdown',
//     template: `
//     <ul>
//       <li *ngFor="#value of values" (click)="select(value.value)">{{value.label}}</li>
//     </ul>
//   `
// })
// export class DropdownComponent {
//     @Input()
//     values: DropdownValue[];
//
//     @Input()
//     value: string[];
//
//     @Output()
//     valueChange: EventEmitter;
//
//     constructor(private elementRef:ElementRef) {
//         this.valueChange = new EventEmitter();
//     }
//
//     select(value) {
//         this.valueChange.emit(value);
//     }
// }

