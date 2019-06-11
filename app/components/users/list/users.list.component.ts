import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import _ from 'lodash';

import { UsersController } from '../../../ducks/users/users.controller';
import { types } from '../../../ducks/users/users.types';
import { IssuesController } from '../../../ducks/issues/issues.controller';
import { types as IssueTypes} from '../../../ducks/issues/issues.types';


@Component({
    selector: 'list-users',
    templateUrl: './users.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UsersListComponent implements OnInit {
    public users$: any;
    public issues$: any;
    public issues: any[] = [{
        id: null,
        user: null
    }];

    constructor(private _users: UsersController, private _issues: IssuesController ,private _store: Store<any>) {
        _store.select('users').subscribe((response) => {
            this.users$ = response;
        });
        _store.select('issues').subscribe((response) => {
            this.issues$ = response;
        });

        this._issues.getIssues().finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this.issues = _.map(data, (issue) => {
                return {
                    id: issue.id,
                    user: issue.user
                };
            });
            this._store.dispatch({
                type: IssueTypes.LIST_ISSUES_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: IssueTypes.LIST_ISSUES_FAILURE,
                error: error.error
            });
        });

    }

    public ngOnInit() {

        this._store.dispatch({
            type: types.LIST_USERS
        });
        this._users.getUsers().finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            console.log(data);
            this._store.dispatch({
                type: types.LIST_USERS_SUCCESS,
                payload: data
            });

        }, (error: any) => {
            this._store.dispatch({
                type: types.LIST_USERS_FAILURE
            });
        });

            console.log(this.users$.data);


    }

    public getIssuesByUser(first_name: string, last_name: string): number {

        let count = 0;
        const full_name = `${first_name} ${last_name}`;
        this.issues.forEach(issue => {
            if ( issue.user === full_name)  {
                count++;
            }
        });
        return count;

    }

}
