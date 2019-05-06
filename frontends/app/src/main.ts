
(window as any).__Zone_disable_requestAnimationFrame=true
import "zone.js/dist/zone"

import { enableProdMode } from "@angular/core"
import { platformBrowser } from "@angular/platform-browser"

import { registerLocaleData } from "@angular/common"
import localeRu from "@angular/common/locales/ru"

import { AppModuleNgFactory } from "./app.module.ngfactory"

import { DEBUG, APP_FULL_NAME } from "./app.config"

console.log(APP_FULL_NAME)

if (!DEBUG) {
  enableProdMode()
}

function main(): Promise<any> {
  registerLocaleData(localeRu)
  return platformBrowser()
         .bootstrapModuleFactory(AppModuleNgFactory)
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
