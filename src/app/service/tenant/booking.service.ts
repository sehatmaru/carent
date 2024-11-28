import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '../common.service'
import { CommonResponse, Page } from '../../interface/common.interface'
import {
  BookingFilterRequestModel,
  BookingListResponseModel,
} from '../../model/booking-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private root = `/booking`

  constructor(private commonApi: CommonService) {}

  getBookingList(
    request: BookingFilterRequestModel,
    pagination: PaginationRequestModel
  ): Observable<CommonResponse<Page<BookingListResponseModel[]>>> {
    const params = {
      pageNum: pagination.pageNumber,
      pageSize: pagination.pageSize,
    }

    return this.commonApi.post(
      `${this.root}/list?${this.commonApi.getSearchParams(params)}`,
      request
    ) as Observable<CommonResponse<Page<BookingListResponseModel[]>>>
  }
}
