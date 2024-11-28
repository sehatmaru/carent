import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { UserRole } from '../enum/user-role.enum'

@Injectable({
  providedIn: 'root',
})
export class AdminManagerGuardService {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (
      localStorage.getItem('account.role') == UserRole[UserRole.TENANT_ADMIN]
    ) {
      this.router.navigate([''])

      return false
    }

    return true
  }
}
