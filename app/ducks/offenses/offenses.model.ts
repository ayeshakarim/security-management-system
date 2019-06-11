export class Offense {

    public id: String;
    public category: String;
    public updated_at: Date;
    public severity: Number;
    public name: String;
    public comment: String;


    constructor( category: String, severity: Number, description: String) {

        // this.id = id;
        this.name = description;
        this.category = category;
        this.severity = severity;
        this.updated_at = new Date();
    }

    public getId() {
        return this.id;
    }

    public getCategory() {
        return this.category;
    }

    public getdescription() {
        return this.name;
    }
    public getSeverity() {
        return this.severity;
    }

    public getComment() {
        return this.comment;
    }

    public getUpdateDate() {
        return this.updated_at;
    }

    public setCategory( category: String) {
        this.category = category;
    }

    public setdescription(description: String) {
        this.name = description;
    }

    public setSeverity(severity: Number) {
        this.severity = severity;
    }

    public setComment(comment: String) {
        this.comment = comment;
    }

    public setUpdateDate(date: Date) {
        this.updated_at = date;
    }
}
