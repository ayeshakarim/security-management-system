import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { PenaltiesController } from '../../../ducks/penalties/penalties.controller';
import { types } from '../../../ducks/penalties/penalties.types';
import { Penalty } from '../../../ducks/penalties/penalties.model';

@Component({
    selector: 'list-penalties',
    templateUrl: './penalties.list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PenaltiesListComponent implements OnInit {
    public penalties$: any;
    public penalties: Penalty[];

    constructor(private _penalties: PenaltiesController, private _store: Store<any>) {
        _store.select('penalties').subscribe((response) => {
            this.penalties$ = response;
        });
    }

    public ngOnInit() {

        this._store.dispatch({
            type: types.LIST_PENALTIES
        });

        this._penalties.getPenalties().finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this._store.dispatch({
                type: types.LIST_PENALTIES_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: types.LIST_PENALTIES_FAILURE
            });
        });
    }


}
