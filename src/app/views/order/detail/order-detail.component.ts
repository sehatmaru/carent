import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputMaskModule } from 'primeng/inputmask'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { DropdownModule } from 'primeng/dropdown'
import { GeoListResponseModel } from 'src/app/model/geo-model'
import { GeoService } from 'src/app/service/geo.service'
import { ProductService } from 'src/app/service/product.service'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { Utils } from 'src/app/utils/utils'
import { ProductOrderRequest } from 'src/app/model/order/product-order-request'
import { ProductDetailResponse } from 'src/app/model/product/product-detail-response'
import { ActivatedRoute } from '@angular/router'
import { RatingModule } from 'primeng/rating'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    InputTextareaModule,
    DropdownModule,
    RatingModule,
    ButtonModule,
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent implements OnInit {
  public geoService = inject(GeoService)
  public productService = inject(ProductService)
  public activatedRoute = inject(ActivatedRoute)
  public utils = inject(Utils)

  public productOrderRequest = new ProductOrderRequest()
  public productDetailResponse = new ProductDetailResponse()

  public productId: number | null = null

  public provinceList: GeoListResponseModel[] = []
  public regencyList: GeoListResponseModel[] = []
  public districtList: GeoListResponseModel[] = []

  public loadings = {
    geoProvince: false,
    geoRegency: false,
    geoDistrict: false,
    productDetail: false,
  }

  ngOnInit(): void {
    this.doGetProvinceList()

    this.activatedRoute.params.subscribe((params) => {
      this.productId = Number(params['id'])

      this.doGetProductDetail()
    })
  }

  doGetProductDetail() {
    this.loadings.productDetail = true

    this.productService.getProductDetail(this.productId!!).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.productDetailResponse = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.productDetail = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.productDetail = false
      },
    })
  }

  doGetProvinceList() {
    this.loadings.geoProvince = true

    this.geoService.getProvinceList('').subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.provinceList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.geoProvince = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.geoProvince = false
      },
    })
  }

  doGetRegencyList() {
    this.loadings.geoRegency = true

    this.geoService
      .getRegencyList(Number(this.productOrderRequest.province), '')
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.regencyList = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.loadings.geoRegency = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.loadings.geoRegency = false
        },
      })
  }

  doGetDistrictList() {
    this.loadings.geoDistrict = true

    this.geoService
      .getDistrictList(Number(this.productOrderRequest.regency), '')
      .subscribe({
        next: (resp) => {
          if (resp.statusCode == StatusCode.SUCCESS) {
            this.regencyList = resp.result
          } else {
            this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
          }

          this.loadings.geoDistrict = false
        },
        error: (error) => {
          this.utils.sendErrorToast(error.message)
          this.loadings.geoDistrict = false
        },
      })
  }
}