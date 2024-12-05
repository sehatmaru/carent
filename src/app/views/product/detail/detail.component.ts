import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { CardModule } from 'primeng/card'
import { DropdownModule } from 'primeng/dropdown'
import { IconFieldModule } from 'primeng/iconfield'
import { ImageModule } from 'primeng/image'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple'
import { GalleriaModule } from 'primeng/galleria'
import { SkeletonModule } from 'primeng/skeleton'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { GeoListResponseModel } from 'src/app/model/geo-model'
import { PaginationRequestModel } from 'src/app/model/pagination-model'
import {
  ProductSearchRequestModel,
  ProductSearchListResponseModel,
} from 'src/app/model/product-model'
import { GeoService } from 'src/app/service/geo.service'
import { ProductService } from 'src/app/service/product.service'
import { Utils } from 'src/app/utils/utils'

@Component({
  selector: 'app-detail',
  standalone: true,
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
    GalleriaModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  public productService = inject(ProductService)
  public geoService = inject(GeoService)
  public utils = inject(Utils)
  public router = inject(Router)
  public activatedRoute = inject(ActivatedRoute)

  public request = new ProductSearchRequestModel()
  public pagination = new PaginationRequestModel()

  public productSearchResponse = new ProductSearchListResponseModel()
  public provinceList: GeoListResponseModel[] = []
  public images = [
    {
      itemImageSrc: '../../../../assets/img/car-1.png',
      thumbnailImageSrc: '../../../../assets/img/car-1.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },

    {
      itemImageSrc: '../../../../assets/img/car-2.png',
      thumbnailImageSrc: '../../../../assets/img/car-2.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc: '../../../../assets/img/car-1.png',
      thumbnailImageSrc: '../../../../assets/img/car-1.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },

    {
      itemImageSrc: '../../../../assets/img/car-2.png',
      thumbnailImageSrc: '../../../../assets/img/car-2.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc: '../../../../assets/img/car-1.png',
      thumbnailImageSrc: '../../../../assets/img/car-1.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },

    {
      itemImageSrc: '../../../../assets/img/car-2.png',
      thumbnailImageSrc: '../../../../assets/img/car-2.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc: '../../../../assets/img/car-1.png',
      thumbnailImageSrc: '../../../../assets/img/car-1.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },

    {
      itemImageSrc: '../../../../assets/img/car-2.png',
      thumbnailImageSrc: '../../../../assets/img/car-2.png',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
  ]

  get activeIndex(): number {
    return this._activeIndex
  }

  set activeIndex(newValue) {
    if (this.images && 0 <= newValue && newValue <= this.images.length - 1) {
      this._activeIndex = newValue
    }
  }

  _activeIndex: number = 2

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ]

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

  toProductDetailPage(id: number) {
    this.router.navigate(['/detail/' + id], {
      queryParams: {
        filter: true,
        startDate: this.request.dates[0],
        endDate: this.request.dates[1],
        time: this.request.time,
        duration: this.request.duration,
        priceStart: this.request.priceStart,
        priceEnd: this.request.priceEnd,
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
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onImageChange(a: any) {}
}
