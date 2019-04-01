import { Component, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { DomSanitizer } from "@angular/platform-browser"

import { Subject, Subscription, of } from "rxjs"
import { mergeMap, timeout, catchError, filter } from "rxjs/operators"

interface IPattern {
  id: string
  data: Array<number>
}

const COLORS = [
  "#2ECC71","#3498DB","#9B59B6","#6C7A89","#F2CA27","#E67E22","#E74C3C","#f032e6","#800000","#000000","#000075","#776e65"
]
const CHAR = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
]

const isNotUndefined = <T>(v: T | undefined): v is T => v !== undefined

@Component({
  selector: "patterns-layout",
  templateUrl: "./patterns.layout.component.html",
  styleUrls: [ "./patterns.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatternsLayoutComponent {

  private _updateSubject = new Subject<IPattern>()

  constructor(
    private _http: HttpClient,
    private _cdr: ChangeDetectorRef,
    private _sanitizer: DomSanitizer
  ) { }

  data: Array<IPattern> = []

  _getPatternsSubscriber!: Subscription
  _updateSubscriber!: Subscription

  ngOnInit() {
    this._getPatternsSubscriber = this._http
                                      .get<Array<IPattern>>("/api/patterns/")
                                      .subscribe((data) => {
                                        this.data = data.sort((a,b) => a.data.length - b.data.length || (a.id < b.id ? -1 : 1))
                                        this._cdr.markForCheck()
                                      })

    this._updateSubscriber = this._updateSubject
                                 .pipe(
                                  mergeMap(
                                    ({id, data}) => this._http.post<IPattern>(
                                                                `/api/patterns/${id}`,
                                                                data,
                                                                {headers: {'Content-Type': 'application/json'} }
                                                              ).pipe(timeout(5000),catchError(() => of(undefined))),
                                    1
                                  ),
                                  filter(isNotUndefined)
                                 )
                                 .subscribe((newMatrix) => {
                                    const matrix = this.data.find(item => item.id === newMatrix.id)
                                    if (matrix === undefined) {
                                      this.data = this.data.concat([newMatrix])
                                                           .sort((a,b) => a.data.length - b.data.length || (a.id < b.id ? -1 : 1))
                                    }
                                 })
  }

  ngOnDestroy() {
    this._getPatternsSubscriber.unsubscribe()
    this._updateSubscriber.unsubscribe()
  }

  getSize(data: Array<number>) {
    const size = Math.floor(Math.sqrt(data.length))
    return this._sanitizer.bypassSecurityTrustStyle(`--size: ${size}`)
  }

  getColor(i: number) {
    return COLORS[i] || "#111111"
  }

  getChar(i: number) {
    return CHAR[i]
  }

  current?: {
    matrix: IPattern
    index: number
  }

  log: Array<IPattern> = []

  isCurrent(matrix: IPattern, index: number) {
    return this.current && this.current.matrix === matrix && this.current.index === index ? true : false
  }

  onClick(matrix: IPattern, index: number) {
    this.current = {matrix, index}
  }

  @HostListener("window:keypress", ["$event"])
  onKeyPress({key}: KeyboardEvent) {
    if (this.current === undefined) {
      return
    }

    const char = key.toUpperCase()
    const id = CHAR.indexOf(char)

    if (id < 0) {
      return
    }

    const oldId = this.current.matrix.data[this.current.index]

    if (oldId === id) {
      return
    }

    this.current.matrix.data[this.current.index] = id
    this._update(this.current.matrix)

    if (!this.log.includes(this.current.matrix)) {
      this.log.push(this.current.matrix)
    }
  }

  private _update(matrix: IPattern) {
    this._updateSubject.next(matrix)
  }

  onSaveClick() {
    this.log.forEach(matrix => this._update(matrix))
    this.log = []
  }
}