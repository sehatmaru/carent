export class CompanyResponseModel {
  public id = 0
  public firmName = ''
  public aliasName = ''
  public address = ''
  public mobile = ''
  public rating = 0
  public foundingDate = new Date()
  public foundingDateFormatted = ''
  public joinDate = new Date()
  public joinDateFormatted = ''
}

export class CompanyUpdateRequestModel {
  public id: number | null = null
  public firmName: string | null = null
  public aliasName: string | null = null
  public address: string | null = null
  public mobile: string | null = null

  isValid(): boolean {
    return (
      this.isTextValid(this.firmName) &&
      this.isTextValid(this.aliasName) &&
      this.isTextValid(this.address) &&
      this.isMobileValid()
    )
  }

  isTextValid(value: any): boolean {
    return value != null && value != ''
  }

  isMobileValid(): boolean {
    return this.mobile != null && /^[0-9]+$/.test(this.mobile)
  }

  reset() {
    this.id = null
    this.firmName = ''
    this.aliasName = ''
    this.address = ''
    this.mobile = ''
  }
}
