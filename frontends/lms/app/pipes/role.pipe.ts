import { Pipe, PipeTransform } from "@angular/core"

import { MRoleTitle, IRole } from "@common/role.interface"

@Pipe({ name: "role" })
export class RolePipe implements PipeTransform {
  transform(role: IRole | Array<IRole>): string {
    return Array.isArray(role) ? role.map(r =>  MRoleTitle.get(r) || "Undefined").join(", ") : MRoleTitle.get(role) || "Undefined"
  }
}
