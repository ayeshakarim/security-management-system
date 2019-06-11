import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';

import { routes } from './users.routes';
import { UsersListComponent } from './list/users.list.component';
import { UsersFormComponent } from './form/users.form.component';

import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { SearchFilterModule } from '../../pipes/searchFilter/searchFilter.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        LoadingSpinnerModule,
        SearchFilterModule,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    declarations: [
        UsersListComponent,
        UsersFormComponent
    ]
})
export class UsersModule {
    public static routes = routes;
}
