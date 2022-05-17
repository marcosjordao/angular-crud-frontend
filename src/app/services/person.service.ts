import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { defaultErrorHandle } from '../helpers/default-error-handle';
import { Person } from '../model/person';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class PersonService {

    constructor(private http: HttpClient,
                @Inject('BASE_API_URL') private baseUrl: string) { }

    private apiUrl = `${this.baseUrl}/person`;

    getPersons(): Observable<Person[]> {
        return this.http.get<Person[]>(this.apiUrl)
            .pipe(
                catchError(defaultErrorHandle('carregar pessoas'))
            );
    }

    getPerson(id: string): Observable<Person> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Person>(url)
            .pipe(
                catchError(defaultErrorHandle(`carregar pessoa [${id}]`))
            );
    }


    addPerson(person: Person): Observable<Person> {
        return this.http.post<Person>(this.apiUrl, person, httpOptions).pipe(
            catchError(defaultErrorHandle('adicionar pessoa'))
        );
    }

    deletePerson(person: Person | string): Observable<Person> {
        const id = typeof person === 'string' ? person : person.id;
        const url = `${this.apiUrl}/${id}`;

        return this.http.delete<Person>(url, httpOptions).pipe(
            catchError(defaultErrorHandle('excluir pessoa'))
        );
    }

    updatePerson(person: Person): Observable<any> {
        return this.http.put(this.apiUrl, person, httpOptions).pipe(
            catchError(defaultErrorHandle('alterar pessoa'))
        );
    }

    private log(message: string) {
        if (!environment.production) {
            console.log(`${message}:`);
        }
    }
}
