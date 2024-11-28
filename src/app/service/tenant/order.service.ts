import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '../common.service'
import { CommonResponse, Page } from '../../interface/common.interface'
import { OrderHistoryResponseModel } from '../../model/order-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private root = `/order`

  constructor(private commonApi: CommonService) {}

  getDashboardOrderHistory(
    pagination: PaginationRequestModel
  ): Observable<CommonResponse<Page<OrderHistoryResponseModel[]>>> {
    const params = {
      pageNum: pagination.pageNumber,
      pageSize: pagination.pageSize,
    }

    return this.commonApi.get(
      `${this.root}/dashboard/history?${this.commonApi.getSearchParams(params)}`
    ) as Observable<CommonResponse<Page<OrderHistoryResponseModel[]>>>
  }
}
