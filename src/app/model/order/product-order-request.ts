import { EngineType } from 'src/app/enum/engine-type.enum'
import { ProductStatus } from 'src/app/enum/product-status.enum'
import { Transmission } from 'src/app/enum/transmission.enum'
import { VehicleBrand } from 'src/app/enum/vehicle-brand.enum'

export class ProductOrderRequest {
  public address: string | null = null
  public phoneNumber: string | null = null
  public province: string | null = null
  public regency: string | null = null
  public district: string | null = null
  public name: string | null = null
  public priceStart: number | null = null
  public priceEnd: number | null = null
  public provinceId: number | null = null
  public provinceName: string | null = null
  public regencyId: number | null = null
  public regencyName: string | null = null
  public districtId: number | null = null
  public districtName: string | null = null
  public transmission: Transmission[] | any[] = []
  public brand: VehicleBrand[] = []
  public engineType: EngineType[] = []
  public startDate: Date | null = null
  public endDate: Date | null = null
  public deliverable: boolean[] = []
  public status: ProductStatus | null = null
  public time: Date | null = null
  public dates: Date[] = []
  public duration = 1
  public capacity: number[] = []

  resetRegency() {
    this.regencyId = null
    this.regencyName = null
    this.districtId = null
    this.districtName = null
  }

  resetDistrict() {
    this.districtId = null
    this.districtName = null
  }

  isValid(): boolean {
    return (
      this.isTextValid(this.provinceId) &&
      this.dates[0] != null &&
      this.dates[1] != null &&
      this.isDateValid(this.time) &&
      this.duration > 0
    )
  }

  isTextValid(value: any): boolean {
    return value != null && value != ''
  }

  isDateValid(value: any): boolean {
    return value != null
  }
}
