import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

export abstract class HttpBaseService {
  baseUrl = `${environment.baseUrl}${environment.apiPath}`;

  constructor(private http: HttpClient) {}

  protected httpGet<T>(path: string, paramsString: string = ''): Observable<T> {
    const url = `${this.baseUrl}${path}`;
    const params = new HttpParams({ fromString: paramsString });
    const options = { params };
    return this.http.get<T>(url, options);
  }

  protected httpPost(path: string, body: any): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    return this.http.post(url, body);
  }

  protected httpPut(path: string, body: any): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    return this.http.put(url, body);
  }

  protected httpDelete(path: string): Observable<any> {
    const url = `${this.baseUrl}${path}`;
    return this.http.delete(url);
  }
}
