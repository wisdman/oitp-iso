import { Pipe, PipeTransform } from "@angular/core"

@Pipe({ name: "avatar" })
export class AvatarPipe implements PipeTransform {
  transform(id: number): string {
    if (!Number.isNaN(id) && id > 0) {
      return `/img/${id}.jpg`
    }

    return "/img/noavatar.png"
  }
}
