// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {UserListComponent} from "./users/user-list.component";
import {FlowerComponent} from "./flowers/flower.component"

// Route Configuration
export const routes: Routes = [
    { path: '', component: FlowerComponent },
    { path: 'users', component: UserListComponent },
    { path: 'flowers', component: FlowerComponent },
    { path: '**', component: FlowerComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);