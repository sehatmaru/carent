export class BalanceResponseModel {
  public totalOrder = 0
  public totalIncome = 0.0
  public totalRevenue = 0.0
  public totalCustomer = 0
}

export class BalanceReportResponseModel {
  public currentOrder = 0
  public orderHistory: BalanceReportHistoryModel[] = []
  public currentIncome = 0
  public incomeHistory: BalanceReportHistoryModel[] = []
  public currentRevenue = 0
  public revenueHistory: BalanceReportHistoryModel[] = []
  public currentCustomer = 0
  public customerHistory: BalanceReportHistoryModel[] = []
  public orderChangeInValue = 0
  public incomeChangeInValue = 0
  public revenueChangeInValue = 0
  public customerChangeInValue = 0
}

export class BalanceReportHistoryModel {
  public month = ''
  public value = 0.0
}
