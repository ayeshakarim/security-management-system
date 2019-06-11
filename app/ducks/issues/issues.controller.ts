import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Issue } from './issues.model';
import { combineLatest } from 'rxjs';
import { User } from '../users/users.model';
import { Offense } from '../offenses/offenses.model';


@Injectable()
export class IssuesController {

    constructor(public db: AngularFirestore) {}

    public getIssues(): Observable<any> {
        return this.db.collection('issues').snapshotChanges().map(changes => {
            return changes.map( a => {
                const data = a.payload.doc.data() as Issue;
                data.id = a.payload.doc.id;
                // return data;

                return this.db.collection('users').doc(data.user).snapshotChanges().take(1).map(actions => {
                    return actions.payload.data();
                }).map((p: User) => {
                    return this.db.collection('offenses').doc(data.offense_id).snapshotChanges().map(oActions => {
                        return oActions.payload.data();
                    }).map((o: Offense) => {
                        return { ...data, user: `${p.first_name} ${p.last_name}`, offense_id: o.category };
                    });
                }).flatMap(merge => combineLatest(merge));
            });
        }).flatMap(merge => combineLatest(merge)).map(data => {
             return [].concat(...data).map(d => {
                return d;
            });
        });
    }

    public getIssueById(issueId: string): Observable<any> {
        return this.db.collection('issues').doc(issueId).snapshotChanges().map(a => {
            const data = a.payload.data() as Issue;
            data.id = a.payload.id;
            return data;
        });
    }

    public getIssuesByUser(uid: string): Observable<any> {
        return this.db.collection('issues', ref => ref.where('user', '==', uid)).snapshotChanges().map(changes => {
            return changes.map( a => {
                const data = a.payload.doc.data() as Issue;
                data.id = a.payload.doc.id;
                // return data;

                return this.db.collection('users').doc(data.user).snapshotChanges().take(1).map(actions => {
                    return actions.payload.data();
                }).map((p: User) => {
                    return this.db.collection('offenses').doc(data.offense_id).snapshotChanges().map(oActions => {
                        return oActions.payload.data();
                    }).map((o: Offense) => {
                        return { ...data, user: `${p.first_name} ${p.last_name}`, offense_id: o.category };
                    });
                }).flatMap(merge => combineLatest(merge));
            });
        }).flatMap(merge => combineLatest(merge)).map(data => {
             return [].concat(...data).map(d => {
                return d;
            });
        });
    }

    public createissue(issue: any) {
        return this.db.collection('issues').add(issue);
    }

    public updateissue(issueId: string, issue){
        return this.db.collection('issues').doc(issueId).set(issue);
    }

    public  deleteUser(issueId) {
        return this.db.collection('issues').doc(issueId).delete();
      }
}
