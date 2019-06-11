import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersController } from '../../../ducks/users/users.controller';
import { IssuesController } from '../../../ducks/issues/issues.controller';

@Component({
    selector: 'list-dashboard',
    templateUrl: './dashboard.home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    public users$: any;
    public issues$: any;

    public numAccountsDisabled:  number = 0;
    public numAccountsFinancial:  number = 0;
    public numAccountsApproval: number = 0;
    public numReports:  number = 0;

    constructor(private _users: UsersController, private _issues: IssuesController , private _store: Store<any>) {
        _store.select('users').subscribe((response) => {
            this.users$ = response;
        });

        _store.select('issues').subscribe((response) => {
            this.issues$ = response;
        });
     }

    ngOnInit() {

        this.users$.data.forEach(user => {

            if (user.isClosed) {
                this.numAccountsApproval ++;
                console.log(this.numAccountsApproval);
            }
            if (user.isDisabled) {
                this.numAccountsDisabled ++;
                console.log(this.numAccountsDisabled);
            }

    });

        this.issues$.data.forEach(issue => {

            if (issue.date < new Date()|| issue.date === new Date())
            {console.log(issue.updated_at);}
            if (!issue.isClosed) {
                this.numReports ++;
            }
        });

    }
}
