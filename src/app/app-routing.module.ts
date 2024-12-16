import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './views/dashboard/dashboard.component'
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component'
import { SearchComponent } from './views/search/search.component'
import { ProductDetailComponent } from './views/product/detail/product-detail.component'
import { OrderDetailComponent } from './views/order/detail/order-detail.component'

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'product/detail/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'order/detail/:id',
        component: OrderDetailComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
