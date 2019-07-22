void function BudgetInit() {

  const budgetForm = document.querySelector<HTMLFormElement>(".budget-form")
  if (!budgetForm) {
    return
  }

  interface IPackage {
    description: string
    items: Array<string>
    prices: Array<number>
    instructors: number
  }

  const PACKAGES = [{ // Стоимость методик по факторам численности городов
    description: "Методика для детей",
    items: ["p-4-5", "p-5-9"],
    prices: [100_000, 125_000, 150_000, 200_000, 250_000, 300_000, 400_000, 450_000],
    instructors: 0.5,
  },{
    description: "Методика для подростков",
    items: ["p-10-14"],
    prices: [100_000, 125_000, 150_000, 180_000, 200_000, 220_000, 250_000, 300_000],
    instructors: 0.5,
  },{
    description: "Методика для взрослых",
    items: ["p-15", "p-60"],
    prices: [100_000, 125_000, 150_000, 200_000, 250_000, 300_000, 400_000, 450_000],
    instructors: 0.5,
  },{
    description: "Методика для изучения английского языка",
    items: ["p-en"],
    prices: [30_000, 50_000, 60_000, 70_000, 80_000, 90_000, 125_000, 125_000],
    instructors: 1,
  }] as Array<IPackage>

  // Роялти по факторам численности городов
  const ROYALTIES = [1_000, 1_000, 2_000, 2_000, 2_000, 3_000, 3_000, 3_000]

  const COACHING = { // Стоимость обучения от количества методик
    1: 20_000,
    2: 30_000,
    3: 30_000,
    4: 30_000,
  } as { [key: number]: number }

  const TRANSFER = 15_000 // Стоимость проезда и проживания во время обучения

  const CABINETS_FACTOR = 0.75 // Занятость кабинетов педагогами
  const PROGRAMS_FACTOR = 0.2 // Увеличение учеников от количества программ

  const FOT_FACTOR = 0.25 // ФОТ тренеров

  // НДФЛ - 13%, ПФР - 20%, ФСС НС И ПЗ - 0,2%
  const VAT_FACTOR = [0.13, 0.20, 0.002]

  // Размеры городов
  const CITY_MAX_SIZES = [25_000, 80_000, 150_000, 300_000, 500_000, 1_000_000, 2_000_000]

  // Функция количества учеников от размера городов
  const LEARNERS_FUNCTION = (x: number) => Math.round(-6.45431 * (10 ** -12) * x ** 2 + 0.0000168732 * x + 15.7682)

  // Функция стоимости оборудования от размера городов
  const FURNITURE_BASE_FUNCTION = (x: number) => Math.round(-1.61358 * (10**-8) * x ** 2 + 0.042183 * x + 31920.5)

  // Функция стоимости оборудования одного кабинета от размера городов
  const FURNITURE_IN_CABINETS_FUNCTION = (x: number) => Math.round(-9.34047 * (10**-9) * x ** 2 + 0.029701 * x + 46031.6)

  // Функция стоимости канцтоваров на тренера от размера города
  const STATIONERY_PER_MONTH_PER_TRAINER_FUNCTION = (x: number) => Math.round(-6.45431 * (10**-10) * x ** 2 + 0.00168732 * x + 1076.82)

  // Функция стоимости канцтоваров на ученика от размера города
  const STATIONERY_PER_MONTH_PER_LEARNER_FUNCTION = (x: number) => Math.round(-1.61358 * (10**-10) * x ** 2 + 0.00042183 * x + 219.205)

  // Функция рекомендованной стоимости от размера города
  const PRICE_FUNCTION = (x: number) => Math.round(-2.37928 * (10**-10) * x ** 2 + 0.000744862 * x + 651.02)

  // Количество занятий ученика в месяц
  const LESSONS_PER_MONTH = 2 * 4 // 2 занятия в неделю

  const ICON = (t: "dollar-up" | "dollar-down" | "payback") => `<svg width="40" height="40"><use xlink:href="/icons.svg#${t}"></use></svg>`

  interface IBudgetOptions {
    programs: Set<string>
    population: number
  }

  class Budget {
    public packages: Array<IPackage>
    public programs: number

    public population!: number
    public instructors!: number

    get learners(): number { // Количество учеников - прогноз
      const base = LEARNERS_FUNCTION(CITY_MAX_SIZES[this.population] || 0)
      return base + Math.round(base * PROGRAMS_FACTOR * this.programs)
    }

    get packagesPrice(): number { // Паушальный взнос
      return this.packages.reduce((sum, {prices}) => sum + prices[this.population], 0)
    }

    get pricePerLesson(): number {
      return PRICE_FUNCTION(CITY_MAX_SIZES[this.population] || 0)
    }

    get coachingPrice(): number { // Стоимость обучения тренеров
      return this.instructors * (COACHING[this.packages.length] || 0)
    }

    get transferPrice(): number { // Стоимость проезда и проживания тренеров
      return this.instructors * TRANSFER
    }

    get fullCoachingPrice(): number { // Обучение тенеров (с учетом проезда и проживания)
      return this.coachingPrice + this.transferPrice
    }

    get furniturePrice(): number { // Стоимость мебели, единоразово
      return FURNITURE_BASE_FUNCTION(CITY_MAX_SIZES[this.population] || 0)
    }

    get cabinetsCount(): number {  // Количество кабинетов от числа педагогов
      return Math.round(this.instructors * CABINETS_FACTOR)
    }

    get furnitureInCabinetsPrice(): number { // Стоимость мебели в кабинеты
      return this.cabinetsCount * FURNITURE_IN_CABINETS_FUNCTION(CITY_MAX_SIZES[this.population] || 0)
    }

    get investments(): number { // Инвестиции всего
      return this.packagesPrice + this.fullCoachingPrice + this.furniturePrice + this.furnitureInCabinetsPrice
    }

    get revenuePerMonth(): number { // Выручка за месяц
      return this.pricePerLesson * this.learners * LESSONS_PER_MONTH
    }

    get royaltie(): number { // Роялти
      return (ROYALTIES[this.population] || 0)
    }

    get stationery(): number {// Канцелярия в месяц
      return this.instructors * STATIONERY_PER_MONTH_PER_TRAINER_FUNCTION(CITY_MAX_SIZES[this.population] || 0)
           + this.learners * STATIONERY_PER_MONTH_PER_LEARNER_FUNCTION(CITY_MAX_SIZES[this.population] || 0)
    }

    get fot(): number { // ФОТ
      return Math.round(this.revenuePerMonth * FOT_FACTOR)
    }

    get vat(): number { // нологи
      return Math.round(this.fot * VAT_FACTOR.reduce((sum, vat) => sum + vat, 0))
    }

    get costs(): number { // Расходы
      return this.royaltie + this.stationery + this.fot + this.vat
    }

    get profitPerMonth(): number {
     return this.revenuePerMonth - this.costs
    }

    get paybackPeriod(): number {
      return Math.ceil(this.investments / this.profitPerMonth)
    }

    constructor(options: IBudgetOptions) {
      this.population = options.population
      this.programs = options.programs.size
      this.packages = PACKAGES.filter(p => p.items.some(id => options.programs.has(id)))
      this.instructors = Math.max(Math.ceil(Array.from(options.programs.values())
                                                 .map(id => PACKAGES.find(item => item.items.includes(id)) )
                                                 .map(item => item && item.instructors || 0)
                                                 .reduce((sum, v) => sum + v, 0)
                         ),2)
    }

    render() {
      if (this.packages.length === 0) {
        return `<div class="budget-result__error">Не выбраны учебные программы</div>`
      }

      return `
        <div class="budget-result__column">
          ${ICON('dollar-down')}
          <h3>Инвестиционные вложения<br><strong class="c-primar">${this.investments.toLocaleString('ru-RU')}</strong> ₽ <span>в том числе:<span></h3>
          <ul class="budget-result__list">
            <li>Паушальная цена: <strong>${this.packagesPrice.toLocaleString('ru-RU')}</strong>₽</li>
            <li>Обучение <strong>${this.instructors}</strong> тенеров: <strong>${this.fullCoachingPrice.toLocaleString('ru-RU')}</strong>₽</li>
            <li>Оборудование офиса: <strong>${this.furniturePrice.toLocaleString('ru-RU')}</strong>₽</li>
            <li>Оборудование <strong>${this.cabinetsCount}</strong> кабинетов: <strong>${this.furnitureInCabinetsPrice.toLocaleString('ru-RU')}</strong>₽</li>
          </ul>
        </div>
        <div class="budget-result__column">
          ${ICON('dollar-down')}
          <h3>Ежемесячные расходы<br><strong class="c-primar">${this.costs.toLocaleString('ru-RU')}</strong> ₽ <span>в том числе:<span></h3>
          <ul class="budget-result__list">
            <li>Роялти: <strong>${this.royaltie.toLocaleString('ru-RU')}</strong>₽</li>
            <li>Канцтовары: <strong>${this.stationery.toLocaleString('ru-RU')}</strong>₽</li>
            <li>ФОТ Тренеров: <strong>${this.fot.toLocaleString('ru-RU')}</strong>₽</li>
            <li>Налоги на ФОТ: <strong>${this.vat.toLocaleString('ru-RU')}</strong>₽</li>
          </ul>
        </div>
        <div class="budget-result__column budget-result__column--col">
          <div>
            ${ICON('payback')}
            <h3>Срок возврата инвестиций<br><strong class="c-success">${this.paybackPeriod.toLocaleString('ru-RU')} месяцев</strong></h3>
          </div>
          <div>
            ${ICON('dollar-up')}
            <h3>Чистая прибыль от<br><strong class="c-success">${this.profitPerMonth.toLocaleString('ru-RU')}</strong></h3>
          </div>
        </div>
        <p class="budget-p">Все расчеты представлены исключительно в ознакомительных целях и не являются публичной оферотой. За более подробной информацией обращайтесь к нашим менеджерам по телефону <a href="tel:+78005513934">8 800 551 39 34</a> и электронной почте <a href="mailto:info@chitai.ru">info@chitai.ru</a>. Или <a href="#request-form">оставте заявку online</a> и мы сами свяжемся с вами.</p>
        <a class="button budget-button" href="#request-form">Оставить заявку</a>
      `
    }
  }

  budgetForm.addEventListener("submit", event => {
    event.preventDefault()
    event.stopPropagation()

    const budgetResult =  document.querySelector<HTMLDivElement>(".budget-result")
    if (!budgetResult) {
      return
    }

    const formData = new FormData(budgetForm)
    const options = Array.from(formData.entries()).reduce( (data, [key, value]) => {
      if (key.match(/^p\-/i)) {
        data.programs.add(key)
        return data
      }

      if (key.match(/^population$/i)) {
        data.population= Number.parseInt(String(value)) || 0
        return data
      }

      return data
    },{
      programs: new Set<string>(),
      population: 0,
    } as IBudgetOptions)

    const budget = new Budget(options)
    budgetResult.innerHTML = budget.render()
  })

}()