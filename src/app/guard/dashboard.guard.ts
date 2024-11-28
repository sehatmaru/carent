import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class DashboardGuardService {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('account.username')) {
      this.router.navigate(['login'])

      return false
    }

    return true
  }
}
