import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { ButtonModule } from 'primeng/button'
import { ToastModule } from 'primeng/toast'
import { DashboardComponent } from './views/dashboard/dashboard.component'
import { MessageService } from 'primeng/api'
import { CommonService } from './service/common.service'
import { GeoService } from './service/tenant/geo.service'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService, CommonService, GeoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
