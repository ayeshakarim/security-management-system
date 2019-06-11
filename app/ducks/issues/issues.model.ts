import { User } from '../users/users.model';
import { Offense } from '../offenses/offenses.model';

export class Issue {

    public id: String;
    public reported_by: string;
    public offense_id: string;
    public severity: Number;
    public user: string;
    public comment: String;
    public isClosed: Boolean;
    public updated_at: Date;
    public penalty: String;

    constructor(rUser: string, offense: string, pUser: string, isClosed: Boolean) {

        this.user = pUser;
        this.reported_by = rUser;
        this.offense_id = offense;
        this.isClosed = isClosed;
        this.updated_at = new Date();
    }
 
}
