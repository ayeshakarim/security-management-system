import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './offenses.routes';
import { OffensesListComponent } from './list/offenses.list.component';
import { OffensesFormComponent } from './form/offenses.form.component';

import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { SearchFilterModule } from '../../pipes/searchFilter/searchFilter.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        LoadingSpinnerModule,
        SearchFilterModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    declarations: [
        OffensesListComponent,
        OffensesFormComponent,
    ]
})
export class OffensesModule {
    public static routes = routes;
}
