import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import _ from 'lodash';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { UsersController } from '../../../ducks/users/users.controller';
import { types as UserTypes } from '../../../ducks/users/users.types';
import { types as IssueTypes } from '../../../ducks/issues/issues.types';
import { types as PenaltyTypes } from '../../../ducks/penalties/penalties.types';

import { PenaltiesController } from '../../../ducks/penalties/penalties.controller';
import { IssuesController } from '../../../ducks/issues/issues.controller';

@Component({
    selector: 'form-users',
    templateUrl: './users.form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class UsersFormComponent implements OnInit {
    // [x: string]: any;
    public id: string;
    public sub: any;
    public user$: any;
    public penalty$: any;
    public issues$: any;
    public issues: string[] = [];
    public p_penalties: any[] = [];
    public setHistory: Boolean = false;

    public account: any[] = ['Host', 'Guest', 'Admin'];

    public form: any = {
        first_name: null,
        last_name: null,
        // city: null,
        // country: null,
        isDisabled: false,
        email: null,
        account_type: null,
        isClosed: null,
        comment: null,
        transactions: null,
        past_penalties: [],
        updated_at: null,
        penalty: null
    };
    public types: string[] = ['automated', 'manual', 'approved', 'rejected'];


    public availablePenalties: any[];

    constructor(private route: ActivatedRoute, private _router: Router, private _user: UsersController, private _issue: IssuesController, private _penalty: PenaltiesController, private _store: Store<any>) {

        _store.select('users').subscribe((response) => {
            this.user$ = response;
        });

        _store.select('issues').subscribe((response) => {
            this.issues$ = response;
        });

        _store.select('penalties').subscribe((response) => {
            this.penalty$ = response;
        });

        this._store.dispatch({
            type: PenaltyTypes.LIST_PENALTIES
        });

        this._penalty.getPenalties().finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this.availablePenalties =  _.map(data, (penalty) => {
                return {
                    id: penalty.id,
                    string: `( ${penalty.category} ) - ${penalty.name}`,
                    name: penalty.name
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
                    type: UserTypes.GET_USERS,
                    uid: this.id
                });

                this._user.getUserById(this.id).finally(() => {
                    console.log('finally logic');
                }).subscribe((data: any) => {
                    // const data = d.find(x => x.id === this.id);
                    this.form = {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        penalty: data.penalty,
                        account_type: data.account_type,
                        isClosed: data.isClosed,
                        isDisabled: data.isDisabled,
                        past_penalties: data.past_penalties,
                        comment: data.comment,
                        transactions: data.transactions

                    };
                    this._store.dispatch({
                        type: UserTypes.GET_USERS_SUCCESS,
                        payload: data
                    });

                    this.setPenaltyHistory();

                }, (error: any) => {
                    this._store.dispatch({
                        type: UserTypes.GET_USERS_FAILURE,
                        error: error.error
                    });
                });
                console.log(this.form.isDisabled);
                this._issue.getIssuesByUser(this.id).finally(() => {
                    console.log('finally logic');
                }).subscribe((data: any) => {

                    data.forEach(issue => {
                        this.issues.push(issue);
                    });
                    console.log(this.issues);
                    this._store.dispatch({
                    type: IssueTypes.GET_ISSUES_SUCCESS,
                    payload: data
                });
            }, (error: any) => {
                this._store.dispatch({
                    type: IssueTypes.GET_ISSUES_FAILURE,
                    error: error.error
                });
            });
            } else {
                this.id = null;
                console.log(this.id);
            }

        });

        if (this.form.past_penalties.length > 5) {
            this.disableAccount(true, 'ZEZESTN8GEP0LMtp3KX8');
        }


    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public onSubmit(e: MouseEvent) {
        e.preventDefault();

        this.form.updated_at = new Date;

        if ( this.form.past_penalties[this.form.past_penalties.length - 1] === this.form.penalty) {
            if ( !this.form.isClosed ) {
                for ( let i = 0; i < this.form.past_penalties.length; i++) {
                    if ( this.form.past_penalties[i] === this.form.penalty) {
                        this.form.past_penalties.splice(i, 1);
                        this.form.penalty = 'oEBSAXGbRCJMISjoDM3x';
                    }
                }
            }
            //if penalty id = no penalty
        } else if (this.form.penalty === 'oEBSAXGbRCJMISjoDM3x') {
            this.form.isClosed = true;

            //if penalty id = disable account
        } else if (this.form.penalty === 'ZEZESTN8GEP0LMtp3KX8') {
            if (this.form.isClosed === true) {
            this.form.isDisabled = true;
            }
        } else {
            console.log('adding penalty to array');
            this.form.past_penalties.push(this.form.penalty);

        }

        if (this.id == null) {
            console.log(this.form);

            // dispatch create
            this._store.dispatch({
                type: UserTypes.CREATE_USERS
            });

            // // request create user
            this._user.createUser(this.form).finally(() => {
                console.log('finally logic');
                console.log(this.form);
            });

            this._router.navigate(['/users/']);

        } else {
            // dispatch update
            this._store.dispatch({
                type: UserTypes.UPDATE_USERS
            });

            // request create user
            this._user.updateUser(this.id, this.form).finally(() => {
                console.log('finally logic');
            });
            this._router.navigate(['/users']);

        }
    }

    public setPenaltyHistory() {
        console.log(this.availablePenalties);
        console.log(this.form.past_penalties);
        console.log(this.p_penalties);

        if (this.setHistory === false || this.form.isClosed === true) {
            this.availablePenalties.forEach(penalty => {
                for (let i in this.form.past_penalties) {
                    if (penalty.id === this.form.past_penalties[i]) {
                        this.p_penalties.push(penalty);
                    }
                }
            });
            this.setHistory = true;
        }
    }

    public popPenaltyHistory(id: string) {
        console.log(id);
        const index1 = this.form.past_penalties.indexOf(id, 0);
        const index2 = this.p_penalties.findIndex(p => p.id === id);

            if (index1 > -1) {
                this.form.past_penalties.splice(index1, 1);
            }

            if (index2 > -1) {
                this.p_penalties.splice(index2, 1);
            }
    }

    public disableAccount(bool: Boolean, penalty: any) {
        console.log(bool);
        if ( this.form.account_type !== 'Admin') {

            this._user.disableUser(this.id, bool, penalty).finally(() => {
                console.log('finally logic');
            });
        }

    }
}
