import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '../common.service'
import { CommonResponse } from '../../interface/common.interface'
import {
  BalanceReportResponseModel,
  BalanceResponseModel,
} from '../../model/finance-model'

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private root = `/finance`

  constructor(private commonApi: CommonService) {}

  getBalance(): Observable<CommonResponse<BalanceResponseModel>> {
    return this.commonApi.get(`${this.root}/balance`) as Observable<
      CommonResponse<BalanceResponseModel>
    >
  }

  getBalanceReport(): Observable<CommonResponse<BalanceReportResponseModel>> {
    return this.commonApi.get(`${this.root}/balance/report`) as Observable<
      CommonResponse<BalanceReportResponseModel>
    >
  }
}
