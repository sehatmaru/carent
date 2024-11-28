export class CustomerFilterRequest {
  public username = ''
  public name = ''
  public mobile = ''
}

export class TenantCustomerResponse {
  public username = ''
  public name = ''
  public mobile = ''
  public lastOrder = new Date()
  public totalOrder = 0
}
