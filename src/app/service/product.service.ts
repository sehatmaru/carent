import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from './common.service'
import { CommonResponse } from '../interface/common.interface'
import {
  ProductSearchRequestModel,
  ProductListResponseModel,
  ProductSearchListResponseModel,
} from '../model/product-model'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private root = `/product`

  constructor(private commonApi: CommonService) {}

  searchProduct(
    request: ProductSearchRequestModel,
    limit: number
  ): Observable<CommonResponse<ProductSearchListResponseModel>> {
    const params = {
      limit: limit,
    }

    return this.commonApi.post(
      `${this.root}/search?${this.commonApi.getSearchParams(params)}`,
      request
    ) as Observable<CommonResponse<ProductSearchListResponseModel>>
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
