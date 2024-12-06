import { Transmission } from '../enum/transmission.enum'
import { VehicleBrand } from '../enum/vehicle-brand.enum'
import { EngineType } from '../enum/engine-type.enum'

export class ProductDetailResponse {
  public id: number | null = null
  public transmission = Transmission.MATIC
  public brand = VehicleBrand.BYD
  public engineType = EngineType.GASOLINE
  public provinceName = ''
  public regencyName = ''
  public districtName = ''
  public companyName = ''
  public seat = ''
  public name = ''
  public price = 0
  public deliverable = false
  public rating = 0.0
}
