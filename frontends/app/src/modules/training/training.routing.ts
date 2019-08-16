import { Routes } from "@angular/router"

import { TrainingLayout } from "./layouts"

export const ROUTES: Routes =
[{
  path: ":type",
  component: TrainingLayout,
}]
