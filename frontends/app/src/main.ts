
import { enableProdMode } from "@angular/core"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"

import { registerLocaleData } from "@angular/common"
import localeRu from "@angular/common/locales/ru"

import { AppModule } from "./app.module"

import { DEBUG } from "./app.config"

if (!DEBUG) enableProdMode()

function main(): Promise<any> {
  registerLocaleData(localeRu)
  return platformBrowserDynamic()
         .bootstrapModule(AppModule)
}

const domReadyHandler = () => {
  document.removeEventListener("DOMContentLoaded", domReadyHandler)
  main().catch((err) => console.error(err))
}

switch (document.readyState) {
  case "loading":
    document.addEventListener("DOMContentLoaded", domReadyHandler)
    break
  case "interactive":
  case "complete":
  default:
    main().catch((err) => console.error(err))
}
