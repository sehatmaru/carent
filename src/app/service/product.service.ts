import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from './common.service'
import { CommonResponse } from '../interface/common.interface'
import {
  ProductSearchRequestModel,
  ProductListResponseModel,
  ProductSearchListResponseModel,
  ProductFilterCountListResponseModel,
} from '../model/product-model'
import { ProductDetailResponse } from '../model/product-detail-response'

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

  getProductFilterCount(
    request: ProductSearchRequestModel
  ): Observable<CommonResponse<ProductFilterCountListResponseModel>> {
    return this.commonApi.post(
      `${this.root}/filter/count`,
      request
    ) as Observable<CommonResponse<ProductFilterCountListResponseModel>>
  }

  getProductDetail(
    productId: number
  ): Observable<CommonResponse<ProductDetailResponse>> {
    return this.commonApi.get(`${this.root}/detail/${productId}`) as Observable<
      CommonResponse<ProductDetailResponse>
    >
  }
}
