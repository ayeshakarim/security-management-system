import { Penalty } from '../penalties/penalties.model';
import { Issue } from '../issues/issues.model';

export class User {

    public id: String;
    public first_name: String;
    public last_name: String;
    public updated_at: Date;
    public email: String;
    // public city: String;
    // public country: String;
    public account_type: String;
    public past_penalties: [];
    public penalty: string;
    public isClosed: Boolean;
    public isDisabled: Boolean;
    public comment: String;
    public transactions: Number;

    constructor (firstName: String, lastName: String, email: String, account_type: String) {

        this.first_name = firstName;
        this.last_name = lastName;
        this.email = email;
        // this.city = city;
        // this.country = country;
        this.account_type = account_type
        this.updated_at = new Date();
    }
}
