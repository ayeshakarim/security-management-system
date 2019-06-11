import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';

import {  combineLatest } from 'rxjs/';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './users.model';
import { Penalty } from '../penalties/penalties.model';

@Injectable()
export class UsersController {

    userCollection: AngularFirestoreCollection<User>;
    users: Observable<User[]>;

    constructor(public db: AngularFirestore) {}

    public getUsers(): Observable<any> {
        return this.db.collection('users').snapshotChanges().map(changes => {
            return changes.map( a => {
                const data = a.payload.doc.data() as User;
                data.id = a.payload.doc.id;
                const penalty_id = data.penalty;
                // return data;

                return this.db.collection('penalties').doc(penalty_id).snapshotChanges().take(1).map(actions => {
                return actions.payload.data();
                }).map((p: Penalty) => {
                return { ...data, penalty: p.name };
                });
            });
        }).flatMap(users => {
            return combineLatest(users);
        });

    }

    public getUserById(userId: string): Observable<any> {
        return this.db.collection('users').doc(userId).snapshotChanges().map(a => {
                const data = a.payload.data() as User;
                data.id = a.payload.id;
                return data;
        });
    }

    public setPenalty(userId: string, penalty: any) {
        return this.db.collection('users').doc(userId).update({'penalty': penalty, 'isClosed': true} );
      }

    public createUser(value: any) {
        return this.db.collection('users').add(value);
    }

    public updateUser(userId: string, value: any) {
        return this.db.collection('users').doc(userId).set(value);
      }

    public updateUserIssues(userId: string, value: any) {
        return this.db.collection('users').doc(userId).update({'issues': value });

    }

    public disableUser(userId: string, value: Boolean, penalty: any) {
        return this.db.collection('users').doc(userId).update({'isDisabled': value, 'penalty': penalty, 'isClosed': true });
    }

    public  deleteUser(userId) {
        return this.db.collection('users').doc(userId).delete();
      }
}
