import { EngineType } from '../enum/engine-type.enum'
import { ProductStatus } from '../enum/product-status.enum'
import { Transmission } from '../enum/transmission.enum'
import { VehicleBrand } from '../enum/vehicle-brand.enum'

export class VehicleFilterRequestModel {
  public id: number | null = null
  public name: string | null = null
  public productId: number | null = null
  public year: string | null = null
  public licenseNumber: string | null = null
  public transmission: Transmission.MATIC | null = null
  public brand: VehicleBrand.BYD | null = null
  public engineType: EngineType | null = null
}

export class VehicleResponseModel {
  public id = 0
  public productId = 0
  public productName = 0
  public price = 0
  public engineType = EngineType.GASOLINE
  public transmission = Transmission.MATIC
  public brand = VehicleBrand.BYD
  public year = false
  public licenseNumber = ProductStatus.AVAILABLE
  public createdDate = new Date()
}

export class VehicleRegisterRequestModel {
  public id: number | null = null
  public productId: number | null = null
  public productName: string | null = null
  public licenseNumber: string | null = null
  public year: string | null = null

  isValid(): boolean {
    return (
      this.isTextValid(this.productId) &&
      this.isTextValid(this.licenseNumber) &&
      this.isTextValid(this.year)
    )
  }

  isTextValid(value: any): boolean {
    return value != null && value != ''
  }

  isLicenseValid(): boolean {
    return (
      this.licenseNumber != null &&
      /^[A-Za-z]{1,2} [0-9]{1,4} [A-Za-z]{1,3}$/.test(this.licenseNumber)
    )
  }

  reset() {
    this.id = null
    this.productId = null
    this.licenseNumber = null
    this.year = null
  }
}
