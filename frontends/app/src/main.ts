
import { enableProdMode } from "@angular/core"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"

import { registerLocaleData } from "@angular/common"
import localeRu from "@angular/common/locales/ru"

import { AppModule } from "./app.module"

declare const DEFINE_DEBUG: boolean
if (!DEFINE_DEBUG) enableProdMode()

registerLocaleData(localeRu)

platformBrowserDynamic()
.bootstrapModule(AppModule)
.catch(err => console.error(err))
