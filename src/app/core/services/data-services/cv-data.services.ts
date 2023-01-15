import { CVDto } from './../../models/cv.models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { FirestoreQuery, FirestoreService } from '../firestore/firestore.service';

@Injectable()
export class CVDataService extends BaseDataService<CVDto> {
    constructor(private firestore: FirestoreService) {
        super('epics');
    }

    public get(): Observable<CVDto[]> {
        return this.firestore.get<CVDto>(this.baseCollection);
    }

    public getOne(id: string): Observable<CVDto> {
        return this.firestore.getOne<CVDto>(this.baseCollection, id);
    }

    public getByUserId(userId: string): Observable<CVDto[]> {
        return this.firestore.get<CVDto>(this.baseCollection);
    }

    public getProjectByUser(userId: string, projectId: string): Observable<CVDto[]> {
        return this.firestore.getProjectUserData<CVDto>(this.baseCollection, projectId);
    }

    public update(data: Partial<CVDto>): Promise<void> {
        return this.firestore.update<CVDto>(this.baseCollection, data.id, data);
    }

    public delete(id: string): Promise<any> {
        return this.firestore.delete(this.baseCollection, id);
    }
    
    public create(data: CVDto): Promise<void> {
        return this.firestore.create(this.baseCollection, data);
    }

    public getDevelopers(): Observable<CVDto[]> {
        return this.firestore.getDevelopers<CVDto>(this.baseCollection);
    }


}