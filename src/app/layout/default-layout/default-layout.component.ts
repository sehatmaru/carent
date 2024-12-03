import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute, RouterOutlet } from '@angular/router'
import { DefaultHeaderComponent } from '../default-header/default-header.component'
import { DefaultFooterComponent } from '../default-footer/default-footer.component'
import { SidebarFilterComponent } from '../sidebar-filter/sidebar-filter.component'
import { CommonModule } from '@angular/common'
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(-100%)' })),
      transition('in <=> out', [animate('300ms ease-in-out')]),
    ]),
  ],
  imports: [
    DefaultHeaderComponent,
    DefaultFooterComponent,
    RouterOutlet,
    SidebarFilterComponent,
    CommonModule,
  ],
  standalone: true,
})
export class DefaultLayoutComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute)

  public isFilterOn = false

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.isFilterOn = params['filter'] === 'true'
    })
  }
}
