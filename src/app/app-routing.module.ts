import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './views/dashboard/dashboard.component'
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component'
import { SearchComponent } from './views/search/search.component'
import { DetailComponent } from './views/product/detail/detail.component'

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
        path: 'detail/:id',
        component: DetailComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
