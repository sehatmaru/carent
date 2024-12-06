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
import { ProductService } from 'src/app/service/product.service'
import { Utils } from 'src/app/utils/utils'
import { StatusCode } from 'src/app/enum/status-code.enum'
import { ProductDetailResponse } from 'src/app/model/product-detail-response'

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

  public productId: number | null = null

  public selectedImage: any = null

  public isFullShow = false

  public showImage: any[] = []

  public images = [
    {
      id: 1,
      srcUrl: '../../../../assets/img/white.jpg',
      thumbnailUrl: '../../../../assets/img/white.jpg',
    },
    {
      id: 2,
      srcUrl: '../../../../assets/img/car-1.png',
      thumbnailUrl: '../../../../assets/img/car-1.png',
    },
    {
      id: 3,
      srcUrl: '../../../../assets/img/black.jpg',
      thumbnailUrl: '../../../../assets/img/black.jpg',
    },
    {
      id: 4,
      srcUrl: '../../../../assets/img/car-2.png',
      thumbnailUrl: '../../../../assets/img/car-2.png',
    },
  ]

  public loadings = {
    productDetail: false,
  }

  ngOnInit(): void {
    this.selectedImage = this.images[0]

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

  selectImage(id: number) {
    this.showImage = []
    this.selectedImage = this.images.filter((e) => e.id == id)[0]
    this.showImage.push(this.selectedImage)
  }

  showFullImage() {
    this.isFullShow = true

    this.showImage = []
    this.showImage.push(this.selectedImage)
  }
}
