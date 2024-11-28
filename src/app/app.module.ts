import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { ButtonModule } from 'primeng/button'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
import { CommonService } from './service/common.service'
import { GeoService } from './service/geo.service'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [
    MessageService,
    CommonService,
    GeoService,
    provideHttpClient(withInterceptorsFromDi()),
    { provide: LOCALE_ID, useValue: 'id' },
  ],
})
export class AppModule {}
