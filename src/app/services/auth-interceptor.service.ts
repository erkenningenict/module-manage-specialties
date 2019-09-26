import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (environment.baseUrl !== 'https://dev.erkenningen.nl/') {
      return next.handle(req);
    }

    // douwe: BEZICHT ZG91d2U6IEJFWklDSFQ=
    // 99999: 1955burk OTk5OTk6IDE5NTVidXJr
    const authHeader = '';
    // const authHeader = 'Basic dmFyZW5rYW1wOiB2YXJlbmthbXA='; // Hoogleraar Agrodis: varenkamp varenkamp
    // const authHeader = 'Basic ZG91d2U6IEJFWklDSFQ='; // Douwe
    // const authHeader = 'Basic OTk5OTk6IDE5NTVidXJr'; // Rector
    // const authHeader = 'Basic cC52dHJvb2RAcGxhbmV0Lm5sOiBCRVpJQ0hU'; // beoordelaar: Rood p.vtrood@planet.nl: BEZICHT
    const authReq = req.clone({ setHeaders: { Authorization: authHeader } });
    return next.handle(authReq);
    // return next.handle(req);
  }
}
