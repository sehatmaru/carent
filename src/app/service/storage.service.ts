import { Injectable } from '@angular/core'
import { UserRole } from '../enum/user-role.enum'

const ID = 'account.id'
const USERNAME = 'account.username'
const NAME = 'account.name'
const TOKEN = 'account.token'
const TEMPORARY_TOKEN = 'account.temporaryToken'
const FORGOT = 'account.forgot'
const ROLE = 'account.role'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setLogin(username: string, role: UserRole, accessToken: string) {
    localStorage.setItem(USERNAME, username)
    localStorage.setItem(ROLE, role.toString())
    localStorage.setItem(TOKEN, accessToken)
  }

  public setTemporaryToken(temporaryToken: string) {
    localStorage.setItem(TEMPORARY_TOKEN, temporaryToken)
  }

  public setForgot() {
    localStorage.setItem(FORGOT, 'yes')
  }

  public setRole(role: string) {
    localStorage.setItem(ROLE, role)
  }

  public removeForgot() {
    localStorage.removeItem(FORGOT)
  }

  public removeLogged() {
    localStorage.removeItem(ID)
    localStorage.removeItem(USERNAME)
    localStorage.removeItem(NAME)
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(ROLE)
  }

  public isLogged() {
    return localStorage.getItem(USERNAME) != null
  }

  public getEmail() {
    return localStorage.getItem(USERNAME) ?? ''
  }

  public getSecureId() {
    return localStorage.getItem(ID) ?? ''
  }

  public getName() {
    return localStorage.getItem(NAME) ?? ''
  }

  public getToken() {
    if (this.getTemporaryToken() != '') return this.getTemporaryToken() ?? ''
    else return localStorage.getItem(TOKEN) ?? ''
  }

  public getTemporaryToken() {
    return localStorage.getItem(TEMPORARY_TOKEN) ?? ''
  }

  public removeTemporaryToken() {
    localStorage.removeItem(TEMPORARY_TOKEN)
  }

  public isAdmin(): boolean {
    const role = localStorage.getItem(ROLE)

    return role != null && role == UserRole[UserRole.ADMIN]
  }

  public isTenantManager(): boolean {
    const role = localStorage.getItem(ROLE)

    return role != null && role == UserRole[UserRole.TENANT_MANAGER]
  }
}
