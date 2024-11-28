import { Component, inject, OnInit } from '@angular/core'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { RippleModule } from 'primeng/ripple'
import { ImageModule } from 'primeng/image'
import { DropdownModule } from 'primeng/dropdown'
import { CalendarModule } from 'primeng/calendar'
import { InputNumberModule } from 'primeng/inputnumber'
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
  ],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  public productService = inject(ProductService)
  public geoService = inject(GeoService)
  public utils = inject(Utils)

  public request = new ProductSearchRequestModel()

  public popularList: ProductListResponseModel[] = []
  public recommendationList: ProductListResponseModel[] = []
  public provinceList: GeoListResponseModel[] = []

  public minDate = new Date()

  public loadings = { geo: false }

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
          // this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.geo = false
      },
      error: (error) => {
        // this.utils.sendErrorToast(error.message)
        this.loadings.geo = false
      },
    })
  }

  doGetPopularList() {
    this.loadings.geo = true

    this.productService.getPopularList().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.popularList = resp.result
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

  doGetRecommendationList() {
    this.loadings.geo = true

    this.productService.getRecommendationList().subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.recommendationList = resp.result
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
    console.log(this.request)
  }
}
