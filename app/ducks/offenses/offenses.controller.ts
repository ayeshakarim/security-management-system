import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Offense } from './offenses.model';

@Injectable()
export class OffensesController {

    constructor(public db: AngularFirestore) {}


    public getOffenses(): Observable<any> {
        // let params = new HttpParams();
        // params = params.append('status', status);
        // return this.db.get<any>(environment.firebase + '/offense', {
        //     params: params
        // });

        return this.db.collection('offenses').snapshotChanges().map(changes => {
            return changes.map( a => {
                const data = a.payload.doc.data() as Offense;
                data.id = a.payload.doc.id;
                return data;
            });
        });

    }

    public getOffenseById(offenseId: string): Observable<any> {
        return this.db.collection('offenses').doc(offenseId).snapshotChanges().map(a => {
            const data = a.payload.data() as Offense;
            data.id = a.payload.id;
            return data;
        });
    }

    public createOffense(offense: any) {
        return this.db.collection('offenses').add(offense);
    }

    public updateOffense(offenseId: string, offense: any) {
        return this.db.collection('offenses').doc(offenseId).set(offense);
    }

    public deleteOffense(offenseId: string) {
        return this.db.collection('offenses').doc(offenseId).delete();

    }
}
