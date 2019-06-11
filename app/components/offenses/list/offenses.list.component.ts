import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { OffensesController } from '../../../ducks/offenses/offenses.controller';
import { types } from '../../../ducks/offenses/offenses.types';
import { Offense } from '../../../ducks/offenses/offenses.model';

@Component({
    selector: 'list-offenses',
    templateUrl: './offenses.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OffensesListComponent implements OnInit {
    public offenses$: any;
    public offenses: Offense[];

    constructor(private _offenses: OffensesController, private _store: Store<any>) {
        _store.select('offenses').subscribe((response) => {
            this.offenses$ = response;
        });

    }

    public ngOnInit() {

        this._store.dispatch({
            type: types.LIST_OFFENSES
        });

        this._offenses.getOffenses().finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this._store.dispatch({
                type: types.LIST_OFFENSES_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: types.LIST_OFFENSES_FAILURE
            });
        });
    }
}
