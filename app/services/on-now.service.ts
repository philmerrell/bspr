import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map";

@Injectable()
export class OnNowService {

    private url = 'https://api.composer.nprstations.org/v1/widget/518272afe1c8a19675b783f2/now?format=json';

    constructor(private http: Http) {}

    getOnNow(): Observable<any> {
        return this.http.get(this.url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}