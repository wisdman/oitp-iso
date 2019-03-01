import { Component, ViewChild } from "@angular/core"
import { Router } from "@angular/router"
import { MatTableDataSource, MatSort } from "@angular/material"

import { IUser } from "@common/user.interface"
import { UsersService } from "../../../../services"

@Component({
  selector: "users-list-layout",
  templateUrl: "./users-list.layout.component.html",
  styleUrls: [ "./users-list.layout.component.css" ],
})
export class UsersListLayoutComponent {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _router: Router,
  ) {}

  displayedColumns: string[] = [ "avatar", "name", "roles", "email", "phone", "actions" ]
  dataSource = new MatTableDataSource(new Array<IUser>())

  @ViewChild(MatSort) sort: MatSort;

  update() {
    this._usersService
        .list()
        .subscribe(list => this.dataSource.data = list)
  }

  ngOnInit(){
    this.update()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }

  add() {
    this._router.navigate(["users", 0])
  }

  edit(item: IUser) {
    this._router.navigate(["users", item.id])
  }

  toggle(item: IUser) {
    console.log(item)
  }

  delete(item: IUser) {
    console.log(item)
  }
}
