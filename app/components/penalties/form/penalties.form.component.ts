import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import _ from 'lodash';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import { PenaltiesController } from '../../../ducks/penalties/penalties.controller';
import { types as PenaltyTypes } from '../../../ducks/penalties/penalties.types';
import { Penalty } from '../../../ducks/penalties/penalties.model';

@Component({
    selector: 'form-penalties',
    templateUrl: './penalties.form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PenaltiesFormComponent implements OnInit {
    public id: string = null;
    public sub: any;
    public penalty$: any;
    public penalties: Penalty[];

    public types: any[] = [{
        id: 'Booking',
        name: 'Booking Constraint'
    }, {
        id: 'Financial',
        name: 'Financial Constraint'
    },
    {
        id: 'Account',
        name: 'Account Constraint'
    },
    {
        id: 'Other',
        name: 'Other Constraint'
    }];

    public form: any = {
        name: null,
        category: null,
        updated_at: null,
        comment: null
    };

    constructor(private route: ActivatedRoute, private _router: Router, private _penalty: PenaltiesController, private _store: Store<any>) {
        _store.select('penalties').subscribe((response) => {
            this.penalty$ = response;
        });

    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = String(params['id']);

            if (this.id && this.id !== 'undefined') {
                console.log('this.id: ' + this.id);
                this._store.dispatch({
                    type: PenaltyTypes.GET_PENALTIES,
                    uid: this.id
                });

                this._penalty.getPenaltyById(this.id).finally(() => {
                    console.log('finally logic');
                    console.log(this.id);
                }).subscribe((data: any) => {
                    this.form = {
                        name: data.name,
                        category: data.category,
                        comment: data.comment,
                        updated_at: data.updated_at
                    };

                    this._store.dispatch({
                        type: PenaltyTypes.GET_PENALTIES_SUCCESS,
                        payload: data
                    });
                }, (error: any) => {
                    this._store.dispatch({
                        type: PenaltyTypes.GET_PENALTIES_FAILURE,
                        error: error.error
                    });
                });
            } else {
                this.id = null;
                console.log(this.id);
            }
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onSubmit(e: MouseEvent) {
        e.preventDefault();

        this.form.updated_at = new Date;
        console.log(this.form);

        if (this.id == null) {
            // dispatch create
            this._store.dispatch({
                type: PenaltyTypes.CREATE_PENALTIES
            });

            // request create offense
            this._penalty.createPenalty(this.form).finally(() => {
                console.log('finally logic');
            });
            this._router.navigate(['/penalties/']);

            // .subscribe((data: any) => {
            //     this._store.dispatch({
            //         type: PenaltyTypes.CREATE_PENALTIES_SUCCESS,
            //         payload: data
            //     });

            // this._router.navigate(['/penalties/view']);
            // }, (error: any) => {
            //     this._store.dispatch({
            //         type: PenaltyTypes.CREATE_PENALTIES_FAILURE,
            //         error: error.error
            //     });
            // });
        } else {
            // dispatch update
            this._store.dispatch({
                type: PenaltyTypes.UPDATE_PENALTIES
            });

            // request create offense
            this._penalty.updatePenalty(this.id, this.form).finally(() => {
                console.log('finally logic');
            // }).subscribe((data: any) => {
            //     this._store.dispatch({
            //         type: PenaltyTypes.UPDATE_PENALTIES_SUCCESS,
            //         payload: data
            //     });

            //     this._router.navigate(['/penalties/']);
            // }, (error: any) => {
            //     this._store.dispatch({
            //         type: PenaltyTypes.UPDATE_PENALTIES_FAILURE,
            //         error: error.error
            //     });
            });
            this._router.navigate(['/penalties/']);

        }
    }
}
