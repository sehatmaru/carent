import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { AvatarModule } from 'primeng/avatar'
import { BadgeModule } from 'primeng/badge'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
  imports: [
    AvatarModule,
    BadgeModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  standalone: true,
})
export class DefaultHeaderComponent {
  private router = inject(Router)

  toDashboard() {
    this.router.navigate(['/'])
  }
}
