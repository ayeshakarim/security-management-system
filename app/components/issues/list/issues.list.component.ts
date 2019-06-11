import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { IssuesController } from '../../../ducks/issues/issues.controller';
import { types } from '../../../ducks/issues/issues.types';
import { types as OffenseTypes} from '../../../ducks/offenses/offenses.types';

import { UsersController } from '../../../ducks/users/users.controller';
import { OffensesController } from '../../../ducks/offenses/offenses.controller';

@Component({
    selector: 'list-isssues',
    templateUrl: './issues.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class IssuesListComponent implements OnInit {
    public issues$: any;
    public user$: any;
    public offenses$: any;


    constructor(private _issues: IssuesController, private _users: UsersController, private _offense: OffensesController, private _store: Store<any>) {
        _store.select('issues').subscribe((response) => {
            this.issues$ = response;
        });

        _store.select('offenses').subscribe((response) => {
            this.offenses$ = response;
        });

        _store.select('users').subscribe((response) => {
            this.user$ = response;
        });
    }

    public ngOnInit() {
        this._store.dispatch({
            type: types.LIST_ISSUES
        });

        this._issues.getIssues().finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this._store.dispatch({
                type: types.LIST_ISSUES_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: types.LIST_ISSUES_FAILURE,
                error: error.error
            });
        });
    }

    getUserName(uid: string) {
        let name: string;
        this._users.getUserById(uid).subscribe(user => {
            name = user.first_name + ' ' + user.last_name;
            console.log(name);
        });
    }
}
