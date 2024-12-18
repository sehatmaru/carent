import { Transmission } from '../../enum/transmission.enum'
import { VehicleBrand } from '../../enum/vehicle-brand.enum'
import { ProductStatus } from '../../enum/product-status.enum'
import { EngineType } from '../../enum/engine-type.enum'

export class ProductSearchRequestModel {
  public id: number | null = null
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

export class ProductOptionListResponseModel {
  public id = 0
  public name = ''
}

export class ProductSearchListResponseModel {
  public total = 0
  public list: ProductListResponseModel[] = []
}

export class ProductFilterCountListResponseModel {
  public matic = 0
  public manual = 0
  public fiveSeat = 0
  public sevenSeat = 0
  public toyota = 0
  public honda = 0
  public mazda = 0
  public suzuki = 0
  public hyundai = 0
  public byd = 0
  public mitsubishi = 0
  public daihatsu = 0
  public nissan = 0
  public otherBrand = 0
  public selfPickup = 0
  public delivery = 0
  public gasoline = 0
  public hybrid = 0
  public electric = 0
  public diesel = 0
}

export class ProductListResponseModel {
  public id = 0
  public seat = 0
  public name = ''
  public price = 0
  public quantity = 0
  public available = 0
  public rating = 0
  public provinceName = ''
  public regencyName = ''
  public districtName = ''
  public transmission = Transmission.MATIC
  public brand = VehicleBrand.BYD
  public engineType = EngineType.GASOLINE
  public deliverable = false
  public isFavorite = false
  public status = ProductStatus.AVAILABLE
  public createdDate = new Date()
}

export class ProductRegisterRequestModel {
  public id: number | null = null
  public name: string | null = null
  public price = 0
  public provinceId: number | null = null
  public provinceName: string | null = null
  public regencyId: number | null = null
  public regencyName: string | null = null
  public districtId: number | null = null
  public districtName: string | null = null
  public deliverable: boolean | null = null
  public transmission: Transmission | null = null
  public seat = 0
  public engineType: EngineType.GASOLINE | null = null
  public brand: VehicleBrand.BYD | null = null

  isValid(): boolean {
    return (
      this.isTextValid(this.name) &&
      this.isPriceValid() &&
      this.isSelectValid(this.deliverable) &&
      this.isSelectValid(this.transmission) &&
      this.isNumberValid(this.seat) &&
      this.isSelectValid(this.engineType) &&
      this.isSelectValid(this.brand) &&
      this.isTextValid(this.provinceId) &&
      this.isTextValid(this.regencyId) &&
      this.isTextValid(this.districtId)
    )
  }

  isTextValid(value: any): boolean {
    return value != null && value != ''
  }

  isNumberValid(value: any): boolean {
    return value != null && value > 0
  }

  isPriceValid(): boolean {
    return this.price != null && this.price > 10000
  }

  isSelectValid(value: any): boolean {
    return value != null
  }

  reset() {
    this.id = null
    this.name = ''
    this.price = 0
    this.provinceId = 0
    this.regencyId = 0
    this.districtId = 0
    this.deliverable = null
    this.transmission = null
    this.seat = 0
    this.engineType = null
    this.brand = null
  }

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
}
