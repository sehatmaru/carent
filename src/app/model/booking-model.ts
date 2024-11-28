import { OrderStatus } from '../enum/order-status.enum'
import { PickupType } from '../enum/pickup-type.enum'

export class BookingFilterRequestModel {
  public id: number | null = null
  public customerId: number | null = null
  public invoiceNumber: string | null = null
  public pickupType: PickupType.DELIVERY | null = null
  public startDate: Date | null = null
  public endDate: Date | null = null
}

export class BookingListResponseModel {
  public id = 0
  public productId = 0
  public productName = ''
  public customerId = 0
  public customerName = ''
  public orderId = 0
  public billId = 0
  public duration = 0
  public rating = 0
  public orderStatus = OrderStatus.IN_PROGRESS
  public invoiceNumber = ''
  public pickupType = PickupType.DELIVERY
  public startDate = new Date()
  public endDate = new Date()
}
