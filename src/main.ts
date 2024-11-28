import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'

import localeId from '@angular/common/locales/id'
import { registerLocaleData } from '@angular/common'

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
registerLocaleData(localeId, 'id')
