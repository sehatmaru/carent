import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { DefaultHeaderComponent } from '../default-header/default-header.component'
import { DefaultFooterComponent } from '../default-footer/default-footer.component'

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [DefaultHeaderComponent, DefaultFooterComponent, RouterOutlet],
  standalone: true,
})
export class DefaultLayoutComponent {}
