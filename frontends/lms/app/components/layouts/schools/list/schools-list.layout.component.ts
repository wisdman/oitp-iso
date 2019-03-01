import { Component, ViewChild } from "@angular/core"
import { Router } from "@angular/router"
import { MatTableDataSource, MatSort } from "@angular/material"

import { ISchool } from "@common/school.interface"
import { SchoolsService } from "../../../../services"

@Component({
  selector: "schools-list-layout",
  templateUrl: "./schools-list.layout.component.html",
  styleUrls: [ "./schools-list.layout.component.css" ],
})
export class SchoolsListLayoutComponent {
  constructor(
    private readonly _schoolsService: SchoolsService,
    private readonly _router: Router,
  ) {}

  displayedColumns: string[] = [ "city", "title", "manager", "email", "phone", "actions" ]
  dataSource = new MatTableDataSource(new Array<ISchool>())

  @ViewChild(MatSort) sort: MatSort;

  update() {
    this._schoolsService
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
    this._router.navigate(["schools", 0])
  }

  edit(item: ISchool) {
    this._router.navigate(["schools", item.id])
  }

  toggle(item: ISchool) {
    console.log(item)
  }

  delete(item: ISchool) {
    console.log(item)
  }
}
