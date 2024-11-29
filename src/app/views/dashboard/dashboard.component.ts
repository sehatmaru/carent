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
  ProductListResponseModel,
  ProductSearchRequestModel,
} from 'src/app/model/product-model'
import { ProductService } from 'src/app/service/product.service'
import { PaginationRequestModel } from 'src/app/model/pagination-model'

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
    InputNumberModule,
    IconFieldModule,
    SkeletonModule,
  ],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  public productService = inject(ProductService)
  public geoService = inject(GeoService)
  public utils = inject(Utils)

  public request = new ProductSearchRequestModel()
  public pagination = new PaginationRequestModel()

  public productSearchList: ProductListResponseModel[] = []
  public dataPagination: any = {}
  public popularList: ProductListResponseModel[] = []
  public recommendationList: ProductListResponseModel[] = []
  public provinceList: GeoListResponseModel[] = []

  public minDate = new Date()

  public loadings = {
    geo: false,
    productSearch: false,
    popularProduct: false,
    recommendationProduct: false,
  }

  ngOnInit(): void {
    this.doGetProvinceList()
    this.doGetPopularList()
    this.doGetRecommendationList()
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

  doGetPopularList() {
    this.loadings.popularProduct = true

    this.productService.getPopularList().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.popularList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.popularProduct = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.popularProduct = false
      },
    })
  }

  doGetRecommendationList() {
    this.loadings.recommendationProduct = true

    this.productService.getRecommendationList().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.recommendationList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.recommendationProduct = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.recommendationProduct = false
      },
    })
  }

  doSearch() {
    this.request.startDate = this.request.dates[0]
    this.request.endDate = this.request.dates[1]

    this.loadings.productSearch = true

    this.productService.searchProduct(this.request, this.pagination).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.dataPagination = resp.result
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
}
