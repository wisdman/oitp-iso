
import { enableProdMode } from "@angular/core"
import { platformBrowser } from "@angular/platform-browser"

import { AppModuleNgFactory } from "./app.module.ngfactory"

import { DEBUG, APP_FULL_NAME } from "./app.config"

console.log(APP_FULL_NAME)

if (!DEBUG) {
  enableProdMode()
}

function main(): Promise<any> {
  return platformBrowser()
          .bootstrapModuleFactory(AppModuleNgFactory)
          .catch((err) => console.error(err))
}

const domReadyHandler = () => {
  document.removeEventListener("DOMContentLoaded", domReadyHandler)
  main()
}

switch (document.readyState) {
  case "loading":
    document.addEventListener("DOMContentLoaded", domReadyHandler)
    break
  case "interactive":
  case "complete":
  default:
    main()
}