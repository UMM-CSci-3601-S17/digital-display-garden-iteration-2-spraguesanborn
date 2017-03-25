import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }         from './app/app.component';
import { AdminComponent } from './app/admin/admin.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { HomeComponent} from './app/home/home.component';
import { UserListComponent } from './app/users/user-list.component';
import { UserListService } from './app/users/user-list.service';
import { HomeService } from './app/home/home.service';
import { routing } from './app/app.routes';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router'
import { PipeModule } from './pipe.module';
import { FlowerComponent } from "./app/flowers/flower.component";
import { FlowerService } from './app/flowers/flower.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing,
        FormsModule,
        PipeModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        UserListComponent,
        FlowerComponent,
        AdminComponent,
    ],
    providers: [ UserListService, HomeService, FlowerService ],
    bootstrap: [ AppComponent, AdminComponent ]
})

export class AppModule {}
