import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { MatDialog } from "@angular/material"

import { IUser } from "@common/user.interface"
import { UsersService } from "../../../../services"

import { MessageComponent } from "../../../message"

@Component({
  selector: "users-item-layout",
  templateUrl: "./users-item.layout.component.html",
  styleUrls: [ "./users-item.layout.component.css" ],
})
export class UsersItemLayoutComponent implements OnInit {
  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _usersService: UsersService,
    private readonly _dialog: MatDialog,
  ){}

  item: IUser = {
    id: 0,
    name: "",
    avatar: 0,
    roles: ["user"],
    email: "",
    phone: "",
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      const id = params["id"]
      this._usersService.get(id as number)
          .subscribe(item => {
            if (item !== undefined){
              this.item = item
            }
          })
    })
  }

  message() {
    this._dialog.open(MessageComponent, { data: this.item.name })
  }
}
