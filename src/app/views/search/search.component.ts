import { Component, inject, OnInit } from '@angular/core'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { RippleModule } from 'primeng/ripple'
import { ImageModule } from 'primeng/image'
import { DropdownModule } from 'primeng/dropdown'
import { CalendarModule } from 'primeng/calendar'
import { InputNumberModule } from 'primeng/inputnumber'
import { SkeletonModule } from 'primeng/skeleton'
import { IconFieldModule } from 'primeng/iconfield'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Utils } from 'src/app/utils/utils'
import { GeoService } from 'src/app/service/geo.service'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { GeoListResponseModel } from 'src/app/model/geo-model'
import {
  ProductSearchListResponseModel,
  ProductSearchRequestModel,
} from 'src/app/model/product-model'
import { ProductService } from 'src/app/service/product.service'
import { PaginationRequestModel } from 'src/app/model/pagination-model'
import { ActivatedRoute, Router } from '@angular/router'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    RippleModule,
    ImageModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    IconFieldModule,
    SkeletonModule,
    InputTextModule,
  ],
  standalone: true,
})
export class SearchComponent implements OnInit {
  public productService = inject(ProductService)
  public geoService = inject(GeoService)
  public utils = inject(Utils)
  public router = inject(Router)
  public activatedRoute = inject(ActivatedRoute)

  public request = new ProductSearchRequestModel()
  public pagination = new PaginationRequestModel()

  public productSearchResponse = new ProductSearchListResponseModel()
  public provinceList: GeoListResponseModel[] = []

  public minDate = new Date()

  public searchLimit = 10

  public loadings = {
    geo: false,
    productSearch: false,
  }

  ngOnInit(): void {
    this.doGetProvinceList()

    this.activatedRoute.queryParams.subscribe((params) => {
      this.request.provinceId = params['location']
      this.request.startDate = new Date(params['startDate'])
      this.request.endDate = new Date(params['endDate'])
      this.request.dates = [this.request.startDate, this.request.endDate]
      this.request.time = new Date(params['time'])
      this.request.duration = params['duration']
      this.request.priceStart = params['priceStart']
      this.request.priceEnd = params['priceEnd']

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

      this.doSearch()
    })
  }

  doGetProvinceList() {
    this.loadings.geo = true

    this.geoService.getProvinceList('').subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.provinceList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.geo = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.geo = false
      },
    })
  }

  doSearch() {
    this.loadings.productSearch = true

    this.updateParamQuery()

    this.request.startDate = new Date(this.request.dates[0])
    this.request.endDate = new Date(this.request.dates[1])

    this.productService
      .searchProduct(this.request, this.searchLimit)
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.productSearchResponse = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.loadings.productSearch = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.loadings.productSearch = false
        },
      })
  }

  updateParamQuery() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        location: this.request.provinceId,
        startDate: this.request.dates[0],
        endDate: this.request.dates[1],
        time: this.request.time,
        duration: this.request.duration,
      },
      queryParamsHandling: 'merge',
    })
  }
}
