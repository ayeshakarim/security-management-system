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

import { OffensesController } from '../../../ducks/offenses/offenses.controller';
import { types as OffenseTypes } from '../../../ducks/offenses/offenses.types';
import { Offense } from '../../../ducks/offenses/offenses.model';
import { PenaltiesController } from '../../../ducks/penalties/penalties.controller';
import { types as PenaltyTypes} from '../../../ducks/penalties/penalties.types';

@Component({
    selector: 'form-offenses',
    templateUrl: './offenses.form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OffensesFormComponent implements OnInit {
    public id: string;
    public sub: any;
    public offense$: any;
    public offense: Offense;
    public availablePenalties: any[];

    public types: any[] = [{
        id: 'Health & Safety',
        name: 'Health and Safety'
    }, {
        id: 'Damage',
        name: 'Property Damage'
    }, {
        id: 'Behaviour',
        name: 'Behaviour'
    }, {
        id: 'Harassment',
        name: 'Harassment - physical'
    }];

    public levels: any[] = [{
        id: 1,
        name: '1 - Critical'
    }, {
        id: 2,
        name: '2 - Severe'
    }, {
        id: 3,
        name: '3 - Moderate'
    }, {
        id: 4,
        name: '4 - Low'
    }];


    public form: any = {
        name: null,
        severity: null,
        comment: null,
        category: null,
        updated_at: null,
        guest_penalty: '',
        host_penalty: ''
    };

    constructor(private route: ActivatedRoute, private _router: Router, private _offense: OffensesController, private _penalty: PenaltiesController,private _store: Store<any>) {
        _store.select('offenses').subscribe((response) => {
            this.offense$ = response;
        });

        this._penalty.getPenalties().finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this.availablePenalties =  _.map(data, (penalty) => {
                return {
                    id: penalty.id,
                    string: `( ${penalty.category} ) - ${penalty.name}`,
                };
            });
            this._store.dispatch({
                type: PenaltyTypes.LIST_PENALTIES_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: PenaltyTypes.LIST_PENALTIES_FAILURE,
                error: error.error
            });
        });

    }

    public ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = String(params['id']);

            if (this.id && this.id !== 'undefined') {
                this._store.dispatch({
                    type: OffenseTypes.GET_OFFENSES,
                    uid: this.id
                });

                console.log(this.id);

                this._offense.getOffenseById(this.id).finally(() => {
                    console.log('finally logic');
                }).subscribe((data: any) => {
                    this.form = {
                        name: data.name,
                        severity: data.severity,
                        comment: data.comment,
                        category: data.category,
                        updated_at: data.updated_at,
                        guest_penalty: data.guest_penalty,
                        host_penalty: data.host_penalty
                    };

                    this._store.dispatch({
                        type: OffenseTypes.GET_OFFENSES_SUCCESS,
                        payload: data
                    });
                }, (error: any) => {
                    this._store.dispatch({
                        type: OffenseTypes.GET_OFFENSES_FAILURE,
                        error: error.error
                    });
                });
            }else {
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
                type: OffenseTypes.CREATE_OFFENSES
            });

            // request create offense
            this._offense.createOffense(this.form).finally(() => {
                console.log('finally logic');
            });
            this._router.navigate(['/offenses/']);
            // .subscribe((data: any) => {
            //     this._store.dispatch({
            //         type: OffenseTypes.CREATE_OFFENSES_SUCCESS,
            //         payload: data
            //     });

            //     this._router.navigate(['/offenses/view', data.id]);
            // }, (error: any) => {
            //     this._store.dispatch({
            //         type: OffenseTypes.CREATE_OFFENSES_FAILURE,
            //         error: error.error
            //     });
            // });
        } else {
            // dispatch update
            this._store.dispatch({
                type: OffenseTypes.UPDATE_OFFENSES
            });

            // request create offense
            this._offense.updateOffense(this.id, this.form).finally(() => {
                console.log('finally logic');
            });
            this._router.navigate(['/offenses/']);

            // .subscribe((data: any) => {
            //     this._store.dispatch({
            //         type: OffenseTypes.UPDATE_OFFENSES_SUCCESS,
            //         payload: data
            //     });

            //     this._router.navigate(['/offenses/view', data.id]);
            // }, (error: any) => {
            //     this._store.dispatch({
            //         type: OffenseTypes.UPDATE_OFFENSES_FAILURE,
            //         error: error.error
            //     });
            // });
        }
    }
}

// this.offenses = new Array();
        // this.offenses.push(new Offense('1', 'harrasment', 1, 'Physical abuse'));
        // this.offenses.push(new Offense('2', 'damage', 3, 'damage to personal belongings'));
        // this.offenses.push(new Offense('3', 'health-safety', 3, 'dirty furniture and floors'));
        // this.offenses.push(new Offense('4', 'behaviour', 4, 'lack of communication'));
        // this.offenses.push(new Offense('5', 'behaviour', 3, 'abusive language and behaviour'));
        // this.offenses.push(new Offense('6', 'health-safety', 4, 'property not up to standard '));
        // this.offenses.push(new Offense('7', 'damage', 2, 'damage to expensive items'));
        // this.offenses.push(new Offense('8', 'harrassment', 2, 'unrully guests harrass neighbours'));
