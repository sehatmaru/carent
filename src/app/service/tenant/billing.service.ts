import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '../common.service'
import { CommonResponse, Page } from '../../interface/common.interface'
import {
  BillingFilterRequestModel,
  BillingListResponseModel,
} from '../../model/billing-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private root = `/billing`

  constructor(private commonApi: CommonService) {}

  getBillingList(
    request: BillingFilterRequestModel,
    pagination: PaginationRequestModel
  ): Observable<CommonResponse<Page<BillingListResponseModel[]>>> {
    const params = {
      pageNum: pagination.pageNumber,
      pageSize: pagination.pageSize,
    }

    return this.commonApi.post(
      `${this.root}/list?${this.commonApi.getSearchParams(params)}`,
      request
    ) as Observable<CommonResponse<Page<BillingListResponseModel[]>>>
  }
}
