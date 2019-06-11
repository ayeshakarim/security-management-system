import { UsersListComponent } from './list/users.list.component';
import { UsersFormComponent } from './form/users.form.component';

export const routes = [{
    path: '',
    children: [{
        path: '',
        component: UsersListComponent
    }, {
        path: 'create',
        component: UsersFormComponent
    }, {
        path: 'edit/:id',
        component: UsersFormComponent
    }]
}];
