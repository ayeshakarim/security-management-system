import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { routes } from './issues.routes';
import { IssuesListComponent } from './list/issues.list.component';
import { IssuesFormComponent } from './form/issues.form.component';

import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { SearchFilterModule } from '../../pipes/searchFilter/searchFilter.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        AngularMultiSelectModule,
        LoadingSpinnerModule,
        SearchFilterModule,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    declarations: [
        IssuesListComponent,
        IssuesFormComponent
    ]
})
export class IssuesModule {
    public static routes = routes;
}
