import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  constructor(
    private http: Http
  ) {}

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
     return Observable.throw(error.json());
  }

  get(path: string, customParams: any): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('ts', environment.ts);
    params.set('apikey', environment.api_key);
    params.set('hash', Md5.hashStr(environment.ts + environment.private_key + environment.api_key).toString());

    for(var i=0; i<customParams.length; i++) {
      params.set(customParams[i].key, customParams[i].value);
    }

    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params })
    .catch(this.formatErrors)
    .map((res: Response) => res.json());
  }

}