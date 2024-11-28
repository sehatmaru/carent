import { Component } from '@angular/core'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { RippleModule } from 'primeng/ripple'
import { ImageModule } from 'primeng/image'
import { DropdownModule } from 'primeng/dropdown'
import { CalendarModule } from 'primeng/calendar'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    RippleModule,
    ImageModule,
    DropdownModule,
    CalendarModule,
  ],
  standalone: true,
})
export class DashboardComponent {
  countries: any[] | undefined = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' },
  ]

  selectedCountry: string | undefined

  date2: Date | undefined
  time: Date | undefined

  isLoading = false

  doSearch() {
    this.isLoading = true
  }
}
