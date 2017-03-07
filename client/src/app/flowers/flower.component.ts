import { Component, OnInit } from '@angular/core';
import { FlowerService } from "./flower.service";
import { Flower } from "./flower";

@Component({
    templateUrl: 'flower.component.html',
    styles: ['button.responseButton { border: 2px solid #4CAF50; width: 49%; height: 60px}',
        'span.glyphicon {font-size: 40px;}', 'input.commentBox {width: 99%; font-size: 200%; height: 80px;border: 2px solid #4CAF50;}',
        'button.submitButton {width: 60%; height:60px; border: 2px solid #4CAF50; font-size: 40px;' +
        ' display: block; margin: auto;}', 'div.fullComment {width: 99%; margin: auto;}', 'hr.flowerPageHR {border: 1px solid #4CAF50;}']
})

// Component class
export class FlowerComponent {
    public bedNames: string[];
    public flowerNames: string[];

    constructor(private flowerService: FlowerService) {
        // this.users = this.userListService.getUsers();
    }

    private parseFlowers(flowers: Flower[]) {
        var tempNames: string[] = [];
        var count = 0;
        for (let each of flowers) {
            tempNames[count] = each.cultivar;
            count++;
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
        this.flowerService.getFlowerNames("GL1").subscribe(
            flowers => this.flowerNames = this.parseFlowers(flowers),
            err => {
                console.log(err);
            }
        );
    }

}



