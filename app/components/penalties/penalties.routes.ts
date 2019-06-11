import { PenaltiesListComponent } from './list/penalties.list.component';
import { PenaltiesFormComponent } from './form/penalties.form.component';

export const routes = [{
    path: '',
    children: [{
        path: '',
        component: PenaltiesListComponent
    }, {
        path: 'create',
        component: PenaltiesFormComponent
    }, {
        path: 'edit/:id',
        component: PenaltiesFormComponent
    }]
}];
