import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from './common.service'
import { CommonResponse } from '../interface/common.interface'
import { GeoListResponseModel } from '../model/geo-model'

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  private root = `/geo`

  constructor(private commonApi: CommonService) {}

  getProvinceList(
    name: string
  ): Observable<CommonResponse<GeoListResponseModel[]>> {
    const params = {
      name: name,
    }

    return this.commonApi.get(
      `${this.root}/provinces?${this.commonApi.getSearchParams(params)}`
    ) as Observable<CommonResponse<GeoListResponseModel[]>>
  }

  getRegencyList(
    provinceId: number,
    name: string
  ): Observable<CommonResponse<GeoListResponseModel[]>> {
    const params = {
      name: name,
    }

    return this.commonApi.get(
      `${this.root}/regencies/${provinceId}?${this.commonApi.getSearchParams(
        params
      )}`
    ) as Observable<CommonResponse<GeoListResponseModel[]>>
  }

  getDistrictList(
    regencyId: number,
    name: string
  ): Observable<CommonResponse<GeoListResponseModel[]>> {
    const params = {
      name: name,
    }

    return this.commonApi.get(
      `${this.root}/districts/${regencyId}?${this.commonApi.getSearchParams(
        params
      )}`
    ) as Observable<CommonResponse<GeoListResponseModel[]>>
  }
}
