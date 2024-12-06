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
import { ScrollTopModule } from 'primeng/scrolltop'
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
import { ActivatedRoute, Router } from '@angular/router'

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
    ScrollTopModule,
  ],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  public productService = inject(ProductService)
  public geoService = inject(GeoService)
  public utils = inject(Utils)
  public router = inject(Router)
  public activatedRoute = inject(ActivatedRoute)

  public request = new ProductSearchRequestModel()
  public pagination = new PaginationRequestModel()

  public popularList: ProductListResponseModel[] = []
  public recommendationList: ProductListResponseModel[] = []
  public provinceList: GeoListResponseModel[] = []

  public totalProduct: number = 0
  public recommendationLimit: number = 0

  public minDate = new Date()

  public loadings = {
    geo: false,
    popularProduct: false,
    recommendationProduct: false,
  }

  ngOnInit(): void {
    this.doGetProvinceList()
    this.doGetPopularList()
    this.doGetRecommendationList()
    this.doGetTotalProduct()
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
    this.recommendationLimit += 10
    this.loadings.recommendationProduct = true

    this.productService
      .getRecommendationList(this.recommendationLimit)
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.recommendationList = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.loadings.recommendationProduct = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.error.detail, error.error.title)
          this.loadings.recommendationProduct = false
        },
      })
  }

  doGetTotalProduct() {
    this.productService.getTotalProduct().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.totalProduct = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }
      },
      error: (error) => {
        this.utils.sendErrorToast(error.error.detail, error.error.title)
      },
    })
  }

  toSearchPage() {
    this.router.navigate(['/search'], {
      queryParams: {
        filter: true,
        location: this.request.provinceName,
        startDate: this.request.dates[0],
        endDate: this.request.dates[1],
        time: this.request.time,
        duration: this.request.duration,
      },
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  toProductDetailPage(id: number) {
    this.router.navigate(['/detail/' + id])

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
