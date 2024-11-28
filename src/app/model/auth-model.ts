import { CredentialType } from '../enum/credential-type.enum'
import { UserRole } from '../enum/user-role.enum'

export class LoginRequestModel {
  public username = ''
  public password = ''
  public role = UserRole[UserRole.ADMIN]

  isValid(): boolean {
    return this.username != '' && this.password != '' && this.role != null
  }
}

export class LoginResponseModel {
  public accessToken = ''
  public username = ''
  public role: UserRole = UserRole.CUSTOMER
}

export class RegisterRequestModel {
  public password = ''
  public fullName = ''
  public username = ''
  public email = ''
  public mobile = ''
  public company: CompanyRegisterRequest = new CompanyRegisterRequest()
  public role: UserRole = UserRole.CUSTOMER
  public credential: CredentialRegisterRequest = new CredentialRegisterRequest()
}

export class CredentialRegisterRequest {
  public credentialNo = ''
  public credentialType: CredentialType = CredentialType.KTP
}

export class CompanyRegisterRequest {
  public firmName = ''
  public aliasName = ''
  public address = ''
  public mobile = ''
  public foundingDate = new Date()
}

export class RegisterResponseModel {
  public otpToken = ''
}

export class VerifyOtpRequestModel {
  public otp = ''
}

export class EditProfileRequestModel {
  public fullname = ''
  public email = ''
}

export class ChangePasswordRequestModel {
  public oldPassword = ''
  public newPassword = ''
}

export class ForgotPasswordRequestModel {
  public email = ''
}

export class ResetPasswordRequestModel {
  public code = ''
  public newPassword = ''
}
