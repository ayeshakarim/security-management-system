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

import { IssuesController } from '../../../ducks/issues/issues.controller';
import { OffensesController } from '../../../ducks/offenses/offenses.controller';
import { UsersController } from '../../../ducks/users/users.controller';
import { types as IssueTypes } from '../../../ducks/issues/issues.types';
import { types as OffenseTypes } from '../../../ducks/offenses/offenses.types';
import { types as UserTypes } from '../../../ducks/users/users.types';
import { PenaltiesController } from '../../../ducks/penalties/penalties.controller';

@Component({
    selector: 'form-issues',
    templateUrl: './issues.form.component.html',
    encapsulation: ViewEncapsulation.None
})
export class IssuesFormComponent implements OnInit {
    public id: string;
    public sub: any;
    public issue$: any;
    public offenses$: any;
    public users$: any;

    public userControl: FormControl = new FormControl();
    public reporterControl: FormControl = new FormControl();

    public userOptions: any[] = [];
    public reporterOptions: any[] = [];


    public userFiltered: Observable<any[]>;
    public reporterFiltered: Observable<any[]>;

    public availableOffenses: any[];
    public penalty: String;

    public form: any = {
        updated_at: null,
        reported_by: null,
        user: null,
        penalty: 'oEBSAXGbRCJMISjoDM3x',
        isClosed: false,
        offense_id: null,
        severity: 1,
        comment: 'no comment'
    };


    constructor(private route: ActivatedRoute, private _router: Router, private _issues: IssuesController, private _offense: OffensesController, private _penalty: PenaltiesController, private _user: UsersController, private _store: Store<any>, private dateAdapter: DateAdapter<NativeDateAdapter>) {
        this.dateAdapter.setLocale('en-US');

        _store.select('issues').subscribe((response) => {
            this.issue$ = response;
        });

        _store.select('offenses').subscribe((response) => {
            this.offenses$ = response;
        });

        _store.select('users').subscribe((response) => {
            this.users$ = response;
        });

        // request offense list
        this._store.dispatch({
            type: OffenseTypes.LIST_OFFENSES
        });

        this._offense.getOffenses().finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this.availableOffenses = _.map(data, (item) => {
                return {
                    id: item.id,
                    details: `( ${item.severity} -  ${item.category} )`,
                    name: item.name
                };
            });
            this._store.dispatch({
                type: OffenseTypes.LIST_OFFENSES_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: OffenseTypes.LIST_OFFENSES_FAILURE,
                error: error.error
            });
        });

        this._store.dispatch({
            type: UserTypes.LIST_USERS
        });

        // request users list
        this._user.getUsers().finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this.userOptions = _.map(data, (user) => {
                const email = (user.email !== null) ? `(${user.email})` : '';
                return Object.assign({}, {
                    id: user.id,
                    name: `${user.first_name} ${user.last_name} (${user.email})`,
                    type: user.account_type

                });
            });

            this.userFiltered = this.userControl.valueChanges
                .startWith(null)
                    .map((user) => {
                        return (user && typeof user === 'object') ? user.name : user;
                    })
                    .map((name) => {
                        return name ? this.filter(name) : this.userOptions.slice();
                    });

            this.reporterFiltered = this.reporterControl.valueChanges
            .startWith(null)
                .map((user) => {
                    return (user && typeof user === 'object') ? user.name : user;
                })
                .map((name) => {
                    return name ? this.filter(name) : this.reporterOptions.slice();
                });

            this._store.dispatch({
                type: UserTypes.LIST_USERS_SUCCESS,
                payload: data
            });
        }, (error: any) => {
            this._store.dispatch({
                type: UserTypes.LIST_USERS_FAILURE,
                error: error.error
            });
        });
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = String(params['id']);


            if (this.id && this.id !== 'undefined') {

                console.log(this.id);

                this._store.dispatch({
                    type: IssueTypes.GET_ISSUES,
                    uid: this.id
                });

                this._issues.getIssueById(this.id).finally(() => {
                    console.log('finally logic');
                }).subscribe((data: any) => {
                    this.form = {
                        updated_at: data.updated_at.toDate(),
                        reported_by: data.reported_by,
                        user: data.user,
                        penalty: data.penalty,
                        isClosed: data.isClosed,
                        comment: data.comment,
                        offense_id: data.offense_id,
                        severity: this.getSeverity(data.offense_id)
                    };
                    this._user.getUserById(data.user).finally(() => {
                        console.log('finally logic');
                    }).subscribe((d: any) => {
                    this.userControl.setValue({
                        id: data.user,
                        name: `${d.first_name} ${d.last_name} ${d.email}`,
                        type: d.account_type
                    });


                    if (this.userControl.value ? this.userControl.value.id : null) {
                        this.getPenalty(this.form.offense_id);
                        console.log('executed');
                    }

                });
                this.setPenalty();

                this._user.getUserById(data.reported_by).finally(() => {
                    console.log('finally logic');
                }).subscribe((d: any) => {
                this.reporterControl.setValue({
                    id: data.reported_by,
                    name: `${d.first_name} ${d.last_name} ${d.email}`
                });

            });
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

        // get user id value
        this.form.user = this.userControl.value ? this.userControl.value.id : null;

        this.form.reported_by = this.reporterControl.value ? this.reporterControl.value.id : null;

             // update users penalty
             console.log(this.form.user, this.form.penalty);
             this._user.setPenalty(this.form.user, this.form.penalty).finally(() => {
                 console.log('finally logic');
             });

        if (this.id == null) {
            // dispatch create
            this._store.dispatch({
                type: IssueTypes.CREATE_ISSUES
            });

            this.form.updated_at = new Date();
            this.getSeverity(this.form.offense_id);

            console.log(this.form.severity);
            // request create issue
            this._issues.createissue(this.form).finally(() => {
                console.log('finally logic');
            });

            this._router.navigate(['/issues/']);

        } else {
            // dispatch update
            this._store.dispatch({
                type: IssueTypes.UPDATE_ISSUES
            });
            // request update issue
            this._issues.updateissue(this.id, this.form).finally(() => {
                console.log('finally logic');
            });

            this._router.navigate(['/issues/']);
        }
    }

    public getSeverity(id: string) {
        this._offense.getOffenseById(id).finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this.form.severity = data.severity;
        });
    }

    public getPenalty(id: string) {
        this._offense.getOffenseById(id).finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            console.log(this.userControl.value.type);
             if (this.userControl.value.type === 'Host') {
                this.form.penalty = data.host_penalty;
                this.setPenalty();

            } else
            if (this.userControl.value.type === 'Guest') {
                this.form.penalty = data.guest_penalty;
                console.log(this.form.penalty);
                this.setPenalty();

            }
        });
    }

    public setPenalty() {
        console.log(this.form.penalty);
        this._penalty.getPenaltyById(this.form.penalty).finally(() => {
            console.log('finally logic');
        }).subscribe((data: any) => {
            this.penalty = data.name;
        });
    }

    public filter(name: any): any[] {
        return this.userOptions.filter((option) => {
            const selected = (name && typeof name === 'object') ? name.name : name;
            return option.name.toLowerCase().indexOf(selected.toLowerCase()) >= 0;
        });
    }

    public displayFn(option: any): any {
        return option ? option.name : option;
    }
}
