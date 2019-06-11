
export class Penalty {

    public id: String;
    public category: String;
    public name: string;
    public comment: String;
    public updated_at: Date;

    constructor(id: String, category: String, name: string) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.updated_at = new Date();
    }

    public getId() {
        return this.id;
    }

    public getCategory() {
        return this.category;
    }

    public getName() {
        return this.name;
    }

    public getComment() {
        return this.comment;
    }

    public getDate() {
        return this.updated_at;
    }

    public setCategory( category: String) {
        this.category = category;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setComment(comment: String) {
        this.comment = comment;
    }

    public setDate(date: Date) {
        this.updated_at = date;
    }
}
