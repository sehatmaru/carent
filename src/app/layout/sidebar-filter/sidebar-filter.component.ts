import { Component, inject, OnInit } from '@angular/core'
import { ProductService } from 'src/app/service/product.service'
import { Utils } from 'src/app/utils/utils'
import { CheckboxModule } from 'primeng/checkbox'
import { ProductSearchRequestModel } from 'src/app/model/product-model'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-sidebar-filter',
  standalone: true,
  imports: [CheckboxModule, CommonModule, FormsModule],
  templateUrl: './sidebar-filter.component.html',
  styleUrl: './sidebar-filter.component.scss',
})
export class SidebarFilterComponent implements OnInit {
  private utils = inject(Utils)
  private productService = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)

  public request = new ProductSearchRequestModel()

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.request.transmission = params['transmission']
      this.request.startDate = new Date(params['startDate'])
      this.request.endDate = new Date(params['endDate'])
      this.request.dates = [this.request.startDate, this.request.endDate]
      this.request.time = new Date(params['time'])
      this.request.duration = params['duration']
    })
  }

  updateParamQuery() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        transmission: this.request.transmission,
        startDate: this.request.dates[0],
        endDate: this.request.dates[1],
        time: this.request.time,
        duration: this.request.duration,
      },
      queryParamsHandling: 'merge',
    })
  }
}
