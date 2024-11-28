export class CustomerFilterRequest {
  public username = ''
  public name = ''
  public mobile = ''
}

export class AdminResponse {
  public id = 0
  public username = ''
  public name = ''
  public mobile = ''
  public email = ''
  public joinDate = new Date()
}

export class AdminRegisterRequestModel {
  public id: number | null = null
  public fullName: string | null = null
  public username: string | null = null
  public email: string | null = null
  public password: string | null = null
  public mobile: string | null = null

  isValid(): boolean {
    return (
      this.isTextValid(this.fullName) &&
      this.isTextValid(this.username) &&
      this.isEmailValid() &&
      (this.id != null || this.isTextValid(this.password)) &&
      this.isMobileValid()
    )
  }

  isTextValid(value: any): boolean {
    return value != null && value != ''
  }

  isMobileValid(): boolean {
    return this.mobile != null && /^[0-9]+$/.test(this.mobile)
  }

  isEmailValid(): boolean {
    return (
      this.email != null &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)
    )
  }

  reset() {
    this.id = null
    this.fullName = ''
    this.username = ''
    this.email = ''
    this.password = ''
    this.mobile = ''
    this.fullName = ''
  }
}
