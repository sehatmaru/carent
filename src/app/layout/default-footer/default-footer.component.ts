import { Component } from '@angular/core'
import { AvatarModule } from 'primeng/avatar'
import { BadgeModule } from 'primeng/badge'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { DividerModule } from 'primeng/divider'

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
  imports: [
    AvatarModule,
    BadgeModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DividerModule,
  ],
  standalone: true,
})
export class DefaultFooterComponent {}
