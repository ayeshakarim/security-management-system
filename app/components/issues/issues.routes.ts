import { IssuesListComponent } from './list/issues.list.component';
import { IssuesFormComponent } from './form/issues.form.component';

export const routes = [{
    path: '',
    children: [{
        path: '',
        component: IssuesListComponent
    }, {
        path: 'create',
        component: IssuesFormComponent
    }, {
        path: 'edit/:id',
        component: IssuesFormComponent
    }]
}];
