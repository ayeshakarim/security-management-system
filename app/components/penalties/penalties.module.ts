import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './penalties.routes';
import { PenaltiesListComponent } from './list/penalties.list.component';
import { PenaltiesFormComponent } from './form/penalties.form.component';

import { SearchFilterModule } from '../../pipes/searchFilter/searchFilter.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';

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
        PenaltiesListComponent,
        PenaltiesFormComponent,
    ]
})
export class PenaltiesModule {
    public static routes = routes;
}
