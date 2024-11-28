import { PaymentType } from '../enum/payment-type.enum'
import { PaymentStatus } from '../enum/payment-status.enum'
import { OrderStatus } from '../enum/order-status.enum'

export class BillingFilterRequestModel {
  public id: number | null = null
  public customerId: number | null = null
  public invoiceNumber: string | null = null
  public orderId: number | null = null
  public paymentType: PaymentType | null = null
  public orderStatus: OrderStatus | null = null
  public paymentStatus: PaymentStatus | null = null
  public createdDate: Date | null = null
  public verifiedDate: Date | null = null
}

export class BillingListResponseModel {
  public id = 0
  public customerId = 0
  public customerName = ''
  public orderId = 0
  public totalPayment = 0
  public totalPaid = 0
  public paymentType = PaymentType.BANK_TRANSFER
  public orderStatus = OrderStatus.IN_PROGRESS
  public paymentStatus = PaymentStatus.WAITING
  public invoiceNumber = ''
  public createdDate = new Date()
  public verifiedDate = new Date()
}
