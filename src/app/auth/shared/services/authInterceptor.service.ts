import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PersistanceService } from '../../../shared/services/persistance.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private persistanceService: PersistanceService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.persistanceService.get('accessToken');

      // fully change request
      request = request.clone({
        setHeaders: {
          Authorization: token ? `Token ${token}` : '',
        },
      });
      // next is the next interceptor in the chain
      return next.handle(request);
    }
}
