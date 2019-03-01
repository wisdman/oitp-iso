import { Component, OnInit, Inject } from "@angular/core"
import { COMMA, ENTER } from "@angular/cdk/keycodes"
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatChipInputEvent } from "@angular/material"

@Component({
  selector: "message-component",
  templateUrl: "./message.component.html",
  styleUrls: [ "./message.component.css" ],
})
export class MessageComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public to: string,
		public dialogRef: MatDialogRef<MessageComponent>,
		public dialog: MatDialog
	) {}

	message: string = ""
	toList: Array<string> = []

	ngOnInit() {
		if (this.to) {
			this.toList.push(this.to)
		}
	}

	readonly separatorKeysCodes: number[] = [ ENTER, COMMA ]

  add(event: MatChipInputEvent): void {
    const input = event.input
    const value = event.value

    if ((value || '').trim()) {
      this.toList.push(value.trim())
    }

    if (input) {
      input.value = ''
    }
  }

  remove(to: string): void {
    const index = this.toList.indexOf(to)

    if (index >= 0) {
      this.toList.splice(index, 1)
    }
  }
}
