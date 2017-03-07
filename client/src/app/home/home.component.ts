import { Component, OnInit } from '@angular/core';
import { HomeService } from "./home.service";

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

// Component class
export class HomeComponent implements OnInit{
    public beds: string[];

    constructor(private bedService: HomeService) {
        // this.users = this.userListService.getUsers();
    }

    ngOnInit(): void {
        this.bedService.getBeds().subscribe(
            beds => this.beds = Object.keys(beds),
            err => {
                console.log(err);
            }
        );
    }
}
