import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core"

@Component({
  selector: "educational-material-card",
  templateUrl: "./educational-material.card.component.html",
  styleUrls: [ "./educational-material.card.component.css" ],
  host: {"class": "card"},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationalMaterialCardComponent implements OnInit {

  item?: {
    title: string,
    date: Date,
    jpg: string,
    href: string,
    rating: number
  }

  ngOnInit() {
    this.item = DATA[Math.floor(Math.random()*DATA.length)]
  }

  get isArticle(): boolean {
    return true
  }

  get isAudio(): boolean {
    return false
  }

  get isVideo(): boolean {
    return false
  }
}

const DATA =
[
{"title":"Похвала стимулирует ребенка к желанию всегда быть на высоте","date":new Date(),"jpg":"http://www.chitai.ru/files/r_350_350/rodsobranie.jpg","href":"http://www.chitai.ru/articles/i102719/","rating":7},
{"title":"Диссертация Лидии Львовны","date":new Date(),"jpg":"http://www.chitai.ru/files/r_350_350/kds.jpg","href":"http://www.chitai.ru/articles/i102716/","rating":7},
{"title":"Мышление","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/myslenie.jpg","href":"http://www.chitai.ru/articles/i102711/","rating":7},
{"title":"Выбор центра, работающего по методике Васильевой Л.Л.","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/shkolavas.jpg","href":"http://www.chitai.ru/articles/i102705/","rating":7},
{"title":"Почему наше будущее зависит от чтения?","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/chtenieknig.jpg","href":"http://www.chitai.ru/articles/i102704/","rating":7},
{"title":"Тренируйте свой мозг - важно!","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/ трен.jpg","href":"http://www.chitai.ru/articles/i102698/","rating":7},
{"title":"Болезнь Альцгеймера: история открытия","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/1469854133_bolezn-alcgeymera.jpg","href":"http://www.chitai.ru/articles/i102697/","rating":7},
{"title":"Диджитализация","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/rsz_children_tablet.jpg","href":"http://www.chitai.ru/articles/i102693/","rating":7},
{"title":"Я родом из «века каменного»","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/chteniebiblio.jpg","href":"http://www.chitai.ru/articles/i102685/","rating":7},
{"title":"Качество гуманитарного образования в России","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/A-Portrait-Of-Two-Girls-With-Their-Governess.jpg","href":"http://www.chitai.ru/articles/i102681/","rating":7},
{"title":"От чего зависит ваш IQ?","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/beach.jpg","href":"http://www.chitai.ru/articles/i102680/","rating":7},
{"title":"Мы на телевидении, о занятиях и учениках!","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/.jpg","href":"http://www.chitai.ru/articles/i102679/","rating":7},
{"title":"Давайте думать!","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/soc.jpg","href":"http://www.chitai.ru/articles/i102676/","rating":7},
{"title":"О скоростных характеристиках чтения","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/Skoro.jpg","href":"http://www.chitai.ru/articles/i102675/","rating":7},
{"title":"Берегите нервную систему своего ребенка!","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/people-3120717_960_720.jpg","href":"http://www.chitai.ru/articles/i102674/","rating":7},
{"title":"Поздравляем наших учеников с высокими результатами на Международном конкурсе","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/2-1.png","href":"http://www.chitai.ru/articles/i102667/","rating":7},
{"title":"Занятия с малышами: развиваем память и логику","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/Videourok.jpg","href":"http://www.chitai.ru/articles/i102661/","rating":7},
{"title":"Когда учить читать?","date":new Date(),"jpg":"http://www.chitai.ru/files/2017/11/29/r_350_350/articles_kogda.jpg","href":"http://www.chitai.ru/articles/i101816/","rating":7},
{"title":"Работа с психологом","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/psy.jpg","href":"http://www.chitai.ru/articles/i102641/","rating":7},
{"title":"Мифы и правда о скорочтении для детей и взрослых","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/webinar.jpg","href":"http://www.chitai.ru/articles/i102640/","rating":7},
{"title":"Иностранный язык в СССР","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/hand-3672941_960_7201221.jpg","href":"http://www.chitai.ru/articles/i102658/","rating":7},
{"title":"Вебинар о скорочтении и обучении детей","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/webinar1408.jpg","href":"http://www.chitai.ru/articles/i102646/","rating":7},
{"title":"Писать левой рукой — по желанию!","date":new Date(),"jpg":"http://www.chitai.ru/files/2018/08/r_350_350/main.jpg","href":"http://www.chitai.ru/articles/i102638/","rating":7},
{"title":"Включите мозги! Читайте! Думайте! Решайте!","date":new Date(),"jpg":"http://www.chitai.ru/files/2017/11/29/r_350_350/articles_vmchdr.jpg","href":"http://www.chitai.ru/articles/i101814/","rating":7},
{"title":"Какова цель обучения по методикам трансформативного обучения?","date":new Date(),"jpg":"http://www.chitai.ru/files/2017/11/29/r_350_350/articles_goaltt.jpg","href":"http://www.chitai.ru/articles/i101815/","rating":7},
{"title":"Как добиться высоких результатов?","date":new Date(),"jpg":"http://www.chitai.ru/files/2017/11/29/r_350_350/articles_supercool.jpg","href":"http://www.chitai.ru/articles/i101813/","rating":7},
{"title":"Оптимизация интеллектуальных ресурсов через скорочтение","date":new Date(),"jpg":"http://www.chitai.ru/files/2017/11/29/r_350_350/articles_oir.jpg","href":"http://www.chitai.ru/articles/i101812/","rating":7},
{"title":"Ответ на один из самых распространенных вопросов тренеров, работающих по нашей методике","date":new Date(),"jpg":"http://www.chitai.ru/files/2017/11/29/r_350_350/articles_bigq.jpg","href":"http://www.chitai.ru/articles/i101811/","rating":7},
{"title":"Нейро-психологическая диагностика и коррекция детей","date":new Date(),"jpg":"http://www.chitai.ru/files/2017/11/29/r_350_350/articles_npd2.jpg","href":"http://www.chitai.ru/articles/i101810/","rating":7},
{"title":"Разрушение образования","date":new Date(),"jpg":"http://www.chitai.ru/files/2017/11/29/r_350_350/articles_edudestroy_t.jpg","href":"http://www.chitai.ru/articles/i101809/","rating":7}
]
