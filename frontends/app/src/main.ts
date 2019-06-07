
import { enableProdMode } from "@angular/core"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"

import { registerLocaleData } from "@angular/common"
import localeRu from "@angular/common/locales/ru"

import { AppModule } from "./app.module"

import { DEBUG } from "./app.config"

if (!DEBUG) enableProdMode()

registerLocaleData(localeRu)

platformBrowserDynamic()
.bootstrapModule(AppModule)
.catch(err => console.error(err))
