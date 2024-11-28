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

  getProductList(
    request: ProductSearchRequestModel
  ): Observable<CommonResponse<Page<ProductListResponseModel[]>>> {
    return this.commonApi.post(`${this.root}/list`, request) as Observable<
      CommonResponse<Page<ProductListResponseModel[]>>
    >
  }

  getPopularList(): Observable<CommonResponse<ProductListResponseModel[]>> {
    return this.commonApi.get(`${this.root}/popular/list`) as Observable<
      CommonResponse<ProductListResponseModel[]>
    >
  }

  getRecommendationList(): Observable<
    CommonResponse<ProductListResponseModel[]>
  > {
    return this.commonApi.get(`${this.root}/recommendation/list`) as Observable<
      CommonResponse<ProductListResponseModel[]>
    >
  }
}
