import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Penalty } from './penalties.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable()
export class PenaltiesController {

    constructor(public db: AngularFirestore) {}


    public getPenalties(): Observable<any> {
        return this.db.collection('penalties').snapshotChanges().map(changes => {
            return changes.map( a => {
                const data = a.payload.doc.data() as Penalty;
                data.id = a.payload.doc.id;
                return data;
            });
        });
    }

    public getPenaltyById(penaltyId: string): Observable<any> {
        return this.db.collection('penalties').doc(penaltyId).snapshotChanges().map(a => {
            const data = a.payload.data() as Penalty;
            data.id = a.payload.id;
            return data;
        });
    }

    public async createPenalty(penalty: any) {
        try {
            const docRef = await this.db.collection('penalties').add(penalty);
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }

    public updatePenalty(penaltyId: string, penalty: any) {
        return this.db.collection('penalties').doc(penaltyId).set(penalty);
    }

    public deletePenalty(penaltyId: string) {
        return this.db.collection('penalties').doc(penaltyId).delete();

    }
}
