import {
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http'
import { tap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { StatusCode } from '../enum/status-code.enum'
import { HandlerResponseService } from '../service/handler-response.service'
import { inject } from '@angular/core'
import { Router } from '@angular/router'

export const CommonInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router)
  const handlerResponseService = inject(HandlerResponseService)

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && event.body) {
        const body = event.body as {
          statusCode: number
          message: string
          result: any
        }
        if (body?.statusCode !== StatusCode.SUCCESS) {
          handlerResponseService.failedResponse(body)
        }
      }
    })
  )
}
