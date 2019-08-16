import { Component, ChangeDetectionStrategy } from "@angular/core"

import { IProgressItem } from "../../interfaces"
import { ProgressService } from "../../services"

@Component({
  selector: "card-progress",
  templateUrl: "./card-progress.components.html",
  styleUrls: [ "./card-progress.components.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProgressComponent {
  static readonly FILTER = [
    'perception'         , // Точность восприятия
    'arithmetic'         , // Арифметико-практическое мышление'
    'attention'          , // Распределение внимания'
    'auditory-memory'    , // Слуховая память'
    'harmonization'      , // Гармонизация работы полушарий'
    'inductance'         , // Индуктивность мышления'
    'lexicon'            , // Активизация лексикона'
    'mnemonics'          , // Мнемотехника'
    'numeric-tables'     , // Числовые таблицы'
    'space-logic'        , // Пространство и логика'
    'teasing'            , // Тезирование'
    'variability'        , // Вариативность мышления'
    'verbal-intelligence', // Вербальный интеллект'
    'visual-memory'      , // Наглядно-образная память'
    'visual-perception'  , // Скорость зрительного восприятия'
  ]

  constructor(public progressService: ProgressService) {}

  allowItem(item: IProgressItem) {
    return CardProgressComponent.FILTER.includes(item.id)
  }
}






