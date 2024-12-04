import { Component, inject, OnInit } from '@angular/core'
import { ProductService } from 'src/app/service/product.service'
import { Utils } from 'src/app/utils/utils'
import { CheckboxModule } from 'primeng/checkbox'
import {
  ProductFilterCountListResponseModel,
  ProductSearchRequestModel,
} from 'src/app/model/product-model'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { SkeletonModule } from 'primeng/skeleton'

@Component({
  selector: 'app-sidebar-filter',
  standalone: true,
  imports: [CheckboxModule, CommonModule, FormsModule, SkeletonModule],
  templateUrl: './sidebar-filter.component.html',
  styleUrl: './sidebar-filter.component.scss',
})
export class SidebarFilterComponent implements OnInit {
  private utils = inject(Utils)
  private productService = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)

  public request = new ProductSearchRequestModel()

  public productFilter = new ProductFilterCountListResponseModel()

  public loadings = {
    count: false,
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.request.startDate = new Date(params['startDate'])
      this.request.endDate = new Date(params['endDate'])
      this.request.dates = [this.request.startDate, this.request.endDate]
      this.request.time = new Date(params['time'])
      this.request.duration = params['duration']
      this.request.provinceId = params['location']

      this.request.transmission = params['transmission']
        ? params['transmission'].split('+')
        : []
      this.request.brand = params['brand'] ? params['brand'].split('+') : []
      this.request.capacity = params['capacity']
        ? params['capacity'].split('+')
        : []
      this.request.engineType = params['engine']
        ? params['engine'].split('+')
        : []
      this.request.deliverable = params['delivery']
        ? params['delivery'].split('+')
        : []
    })

    this.doGetProductFilterCount()
  }

  doGetProductFilterCount() {
    this.loadings.count = true

    this.productService.getProductFilterCount(this.request).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.productFilter = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.count = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.count = false
      },
    })
  }

  updateParamQuery() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        startDate: this.request.dates[0],
        endDate: this.request.dates[1],
        time: this.request.time,
        duration: this.request.duration,
        transmission:
          this.request.transmission.length > 0
            ? this.request.transmission.join('+')
            : this.request.transmission[0],
        capacity:
          this.request.capacity.length > 0
            ? this.request.capacity.join('+')
            : this.request.capacity[0],
        brand:
          this.request.brand.length > 0
            ? this.request.brand.join('+')
            : this.request.brand[0],
        delivery:
          this.request.deliverable.length > 0
            ? this.request.deliverable.join('+')
            : this.request.deliverable[0],
        engine:
          this.request.engineType.length > 0
            ? this.request.engineType.join('+')
            : this.request.engineType[0],
      },
      queryParamsHandling: 'merge',
    })
  }
}
