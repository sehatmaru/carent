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
import { DialogModule } from 'primeng/dialog'
import { RatingModule } from 'primeng/rating'
import { BadgeModule } from 'primeng/badge'
import { FieldsetModule } from 'primeng/fieldset'
import { ProductService } from 'src/app/service/product.service'
import { Utils } from 'src/app/utils/utils'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { ProductDetailResponse } from 'src/app/model/product-detail-response'
import { AvatarModule } from 'primeng/avatar'
import { ProductListResponseModel } from 'src/app/model/product-model'
import { ProductReviewListResponse } from 'src/app/model/product-review-list-response'

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
    DialogModule,
    RatingModule,
    BadgeModule,
    AvatarModule,
    FieldsetModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  public productService = inject(ProductService)
  public utils = inject(Utils)
  public router = inject(Router)
  public activatedRoute = inject(ActivatedRoute)

  public productDetailResponse = new ProductDetailResponse()

  public popularList: ProductListResponseModel[] = []
  public reviewList: ProductReviewListResponse[] = []

  public productId: number | null = null

  public selectedImage: any = null

  public isFullShow = false

  public images = [
    {
      id: 1,
      srcUrl: '../../../../assets/img/black-2.png',
      thumbnailUrl: '../../../../assets/img/black-2.png',
    },
    {
      id: 2,
      srcUrl: '../../../../assets/img/car-1.png',
      thumbnailUrl: '../../../../assets/img/car-1.png',
    },
    {
      id: 3,
      srcUrl: '../../../../assets/img/white.jpg',
      thumbnailUrl: '../../../../assets/img/white.jpg',
    },
    {
      id: 4,
      srcUrl: '../../../../assets/img/car-2.png',
      thumbnailUrl: '../../../../assets/img/car-2.png',
    },
  ]

  public reviews = [
    {
      id: 1,
      name: 'Alex',
      reviewDate: new Date(),
      rating: 4,
      imgSrc:
        'https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png',
      review:
        'We are very happy with the service from the CARENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.',
    },
    {
      id: 2,
      name: 'Morgan',
      reviewDate: new Date(),
      rating: 5,
      imgSrc:
        'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png',
      review:
        'We are greatly helped by the services of the CARENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.',
    },
  ]

  public loadings = {
    productDetail: false,
    popularProduct: false,
    productReviews: false,
  }

  ngOnInit(): void {
    this.selectedImage = this.images[0]
    this.doGetPopularList()

    this.activatedRoute.params.subscribe((params) => {
      this.productId = Number(params['id'])

      this.doGetProductDetail()
      this.doGetProductReviewList()
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

  doGetPopularList() {
    this.loadings.popularProduct = true

    this.productService.getPopularList(3).subscribe({
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

  doGetProductReviewList() {
    this.loadings.productReviews = true

    this.productService.getProductReviews(this.productId!!).subscribe({
      next: (resp) => {
        if (resp.statusCode == StatusCode.SUCCESS) {
          this.reviewList = resp.result
        } else {
          this.utils.sendErrorToast(resp.message, resp.statusCode.toString())
        }

        this.loadings.productReviews = false
      },
      error: (error) => {
        this.utils.sendErrorToast(error.message)
        this.loadings.productReviews = false
      },
    })
  }

  selectImage(id: number) {
    this.selectedImage = this.images.filter((e) => e.id == id)[0]
  }

  nextPreviewImage() {
    if (this.selectedImage.id != this.images.length) {
      this.selectImage(this.selectedImage.id + 1)
    }
  }

  previousPreviewImage() {
    if (this.selectedImage.id != 1) {
      this.selectImage(this.selectedImage.id - 1)
    }
  }

  toProductDetailPage(id: number) {
    this.router.navigate(['/detail/' + id])

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
