import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { CommonService } from '../common.service'
import { CommonResponse, Page } from '../../interface/common.interface'
import {
  VehicleFilterRequestModel,
  VehicleRegisterRequestModel,
  VehicleResponseModel,
} from '../../model/vehicle-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private root = `/vehicle`

  constructor(private commonApi: CommonService) {}

  getVehicleList(
    request: VehicleFilterRequestModel,
    pagination: PaginationRequestModel
  ): Observable<CommonResponse<Page<VehicleResponseModel[]>>> {
    const params = {
      pageNum: pagination.pageNumber,
      pageSize: pagination.pageSize,
    }

    return this.commonApi.post(
      `${this.root}/list?${this.commonApi.getSearchParams(params)}`,
      request
    ) as Observable<CommonResponse<Page<VehicleResponseModel[]>>>
  }

  registerVehicle(
    request: VehicleRegisterRequestModel
  ): Observable<CommonResponse<any>> {
    return this.commonApi.post(`${this.root}/register`, request) as Observable<
      CommonResponse<any>
    >
  }

  updateVehicle(
    request: VehicleRegisterRequestModel
  ): Observable<CommonResponse<any>> {
    return this.commonApi.post(
      `${this.root}/update/${request.id}`,
      request
    ) as Observable<CommonResponse<any>>
  }

  deleteVehicle(vehicleId: number): Observable<CommonResponse<any>> {
    return this.commonApi.post(
      `${this.root}/delete/${vehicleId}`,
      null
    ) as Observable<CommonResponse<any>>
  }
}
