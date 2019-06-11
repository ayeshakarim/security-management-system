import { Routes } from '@angular/router';
import { DataResolver } from './app.resolver';

import { NoContentComponent } from './components/no-content/no-content.component';

export const ROUTES: Routes = [
    {
        path: '',
        loadChildren: './components/dashboard#DashboardModule',
    }, {
        path: 'dashboard',
        loadChildren: './components/dashboard#DashboardModule',
    }, {
        path: 'issues',
        loadChildren: './components/issues#IssuesModule',
    }, {
        path: 'users',
        loadChildren: './components/users#UsersModule',
    }, {
        path: 'penalties',
        loadChildren: './components/penalties#PenaltiesModule',
    }, {
        path: 'offenses',
        loadChildren: './components/offenses#OffensesModule',
    }, {
        path: '**',
        component: NoContentComponent
    }
];
