import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from './common.service'
import { CommonResponse, Page } from '../interface/common.interface'
import {
  ProductSearchRequestModel,
  ProductListResponseModel,
  ProductRegisterRequestModel,
  ProductOptionListResponseModel,
} from '../model/product-model'
import { PaginationRequestModel } from '../model/pagination-model'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private root = `/product`

  constructor(private commonApi: CommonService) {}

  searchProduct(
    request: ProductSearchRequestModel,
    pagination: PaginationRequestModel
  ): Observable<CommonResponse<Page<ProductListResponseModel[]>>> {
    const params = {
      pageNum: 1,
      pageSize: pagination.pageSize,
    }

    return this.commonApi.post(
      `${this.root}/search?${this.commonApi.getSearchParams(params)}`,
      request
    ) as Observable<CommonResponse<Page<ProductListResponseModel[]>>>
  }

  getPopularList(): Observable<CommonResponse<ProductListResponseModel[]>> {
    return this.commonApi.get(`${this.root}/popular/list`) as Observable<
      CommonResponse<ProductListResponseModel[]>
    >
  }

  getRecommendationList(
    limit: number
  ): Observable<CommonResponse<ProductListResponseModel[]>> {
    const params = {
      limit: limit,
    }

    return this.commonApi.get(
      `${this.root}/recommendation/list?${this.commonApi.getSearchParams(
        params
      )}`
    ) as Observable<CommonResponse<ProductListResponseModel[]>>
  }

  getTotalProduct(): Observable<CommonResponse<number>> {
    return this.commonApi.get(`${this.root}/total`) as Observable<
      CommonResponse<number>
    >
  }
}
