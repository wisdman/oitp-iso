import { Pipe, PipeTransform } from '@angular/core';

import { IProgressItem } from "../services"

@Pipe({ name: "progressItemsFilter" })
export class ProgressItemsFilterPipe implements PipeTransform {
  transform(items: IProgressItem[], ids: string) {
    const arrOfIds = ids.split(",").map(v => v.trim())
    return items.filter(({id}) => arrOfIds.includes(id))
  }
}