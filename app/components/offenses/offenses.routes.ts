import { OffensesListComponent } from './list/offenses.list.component';
import { OffensesFormComponent } from './form/offenses.form.component';

export const routes = [{
    path: '',
    children: [{
        path: '',
        component: OffensesListComponent
    }, {
        path: 'create',
        component: OffensesFormComponent
    }, {
        path: 'edit/:id',
        component: OffensesFormComponent
    }]
}];
