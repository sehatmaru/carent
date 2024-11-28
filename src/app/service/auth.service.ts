import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  LoginRequestModel,
  LoginResponseModel,
  RegisterRequestModel,
  RegisterResponseModel,
} from '../model/auth-model'
import { CommonService } from './common.service'
import { CommonResponse } from '../interface/common.interface'
import { StorageService } from './storage.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private root = `/auth`

  constructor(
    private commonApi: CommonService,
    private storageService: StorageService
  ) {}

  doLogin(
    bodyRequest: LoginRequestModel
  ): Observable<CommonResponse<LoginResponseModel>> {
    this.storageService.setRole(bodyRequest.role)

    return this.commonApi.post(
      `${this.root}/login`,
      bodyRequest,
      false
    ) as Observable<CommonResponse<LoginResponseModel>>
  }

  doRegister(
    bodyRequest: RegisterRequestModel
  ): Observable<CommonResponse<RegisterResponseModel>> {
    return this.commonApi.post(
      `${this.root}/register`,
      bodyRequest,
      false
    ) as Observable<CommonResponse<RegisterResponseModel>>
  }

  doLogout(): Observable<CommonResponse<Boolean>> {
    return this.commonApi.post(
      `${this.root}/logout`,
      null,
      false
    ) as Observable<CommonResponse<Boolean>>
  }
}
