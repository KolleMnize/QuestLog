import { Routes } from '@angular/router';
import { HomePageComponent } from './presentation/views/home-page.component/home-page.component';
import {StructurePageComponent } from './presentation/views/structure-page.component/structure-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent},
    { path: 'structure', component: StructurePageComponent},
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
