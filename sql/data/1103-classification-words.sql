SET search_path = "$user";

INSERT INTO private.trainer__classification_words__data("group", "words") VALUES
  ('Художники', '{Мясоедов,Перов,Пуссен,Веласкес,Тулуз-лотрек,Брюллов,Моне,Мунк,Кустодиев,Куиджи,Шагал,Дали,Модельяни,Васнецов,Шишкин,Гоген,Серебрякова,Веницианов,Серов,Саврасов,Муха,Рубенс,Петров-водкин,Суриков,Нестеров,Беллини,Дейнека,Коровин,Кандинский,Мане,Айвазовский,Бакст,Верещагин,Иванов,Маковский,Рембрант,Левитан,Поленов,Пикассо,Врубель,Репин,Ге,Вермеер,Босх,Рафаэль,Караваджо,Кипренский,Эйк,Крамской,Тициан,Тернер,Горчарова,Санти}'),
  ('Режиссеры', '{Станиславский,Кубрик,Хичкок,Данелия,Гриффит,Захаров,Бергман,Феллини,Эйзенштейн,Меньшов,Куросава,Немирович-данченко,Рязанов,Чаплин,Гайдай,Масленников,Ростоцкий,Бондарчук,Форд}'),
  ('Столицы', '{Валлетта,Яунде,Прая,Манама,Доха,Габароне,Сукре,Ханой,Порт-луи,Дили,Сан-хосе,Сана,Порто-ново,Катманду,Амман,Триполи,Астана,Каракас,Кигали,Розо}'),
  ('Реки', '{Марха,Кеть,Витим,Тавда,Кама,Чулым,Оленёк,Онон,Дон,Печора,Ангара,Анадырь,Вятка,Авнюга,Амга,Урал,Демьянка,Тура,Бирюса}'),
  ('Живопись', '{Акцент,Пестрота,Тональность,Импрессионизм,Контраст,Моделировка,Фреска,Энкаустика,Примитивизм,Реализм,Пастозность,Иллюзорность,Кроки,Витраж,Перспектива,Гризайль,Жухлость,Фактура,Блик,Рефлекс}'),
  ('Кино', '{Ракурс,Перебивка,Твист,Реверс,Питчинг,Колоризация,Рапид,Короткомет,Футадж,Саундтрек,Монтаж,Ражка,Реквизит,Ровние,Сиквел,Приквел,Экспони,Гэг,Петличка,Камео,Зум,Вертиго}'),
  ('История', '{Ликбез,Челядь,Путч,Сословие,Ударник,Антанта,Депортация,Диссидент,Ассамблеи,Приватизация,Интервенция,Смерд,Губерния,Посад,Хутор,Гулаг,Вече,Конверсия,Колонизация,Картель}'),
  ('Геополитика', '{Пассионарность,Аэрократия,Идеократия,Евразийство,Интеграция,Экспансия,Этногенез,Левиафан,Антисистема,Медиакратия,Геостратегия,Химера,Этнос,Периферия,Автаркия,Метаполе,Мондиализм,Номос,Симбиоз,Атлантизм}'),
  ('Музыка', '{Кластер,Полутон,Аранжировка,Альт,Лютня,Реприза,Бекар,Модуляция,Диатоника,Диссонанс,Трель,Тоника,Синкопа,Кабалетта,Затакт,Свинг,Гриф,Квинтет,Септет,Тесситура}'),
  ('Актеры', '{Державин,Муратова,Тихонов,Мерфи,Фомкин,Михалковский,Сенчина,Бодров,Лях,Ельчин,Цой,Баталов,Брусникин,Карпова,Харлоу,Леджер,Васильева,Глаголева,Горошина,Караченцев}'),
  ('Страны', '{Бруней,Гренада,Йемен,Кения,Бутан,Гондурас,Марокко,Непал,Бангладеш,Катар,Вануату,Нигер,Палау,Бахрейн,Буркина-фасо,Либерия,Косово,Камерун,Коста-рика,Ливия}'),
  ('Компьютер', '{Курсор,Апгрейд,Драйвер,Хост,Баг,Фейк,Троян,Роутер,Плагин,Торрент,Болванка,Деинсталляция,Софт,Авторизация,Джойстик,Модератор,Лагер,Сервер,Дискета,Интерфейс}'),
  ('Насекомые', '{Навозник,Мягкотелка,Москит,Плавунец,Медведка,Тля,Грибоед,Зерновка,Щелкун,Овод,Радужница,Хрущ,Восковик,Слепень,Палочник,Шершень,Бражник,Цикадка,Саранча}'),
  ('Медицина', '{Психосоматика,Тремор,Катарсис,Булимия,Аффект,Гемосорбция,Сома,Симуляция,Фрустрация,Нейролептики,Пульсоксиметр,Допинг,Ремиссия,Антидот,Паранойя,Дисфория,Астения,Псевдология,Аутотренинг}'),
  ('Русский язык', '{Сленг,Спряжение,Фонология,Полисемия,Умолчание,Лигатура,Клинопись,Градация,Дискурс,Апостроф,Соподчинение,Метатеза,Клише,Каламбур,Семиотика,Инфинитив,Синекдоха}'),
  ('Литература', '{Бурлеск,Пасквиль,Кантата,Фельетон,Аллитерация,Фабула,Клаузула,Лаконизм,Прототип,Эвфемизм,Троп,Кода,Амфибрахий,Памфлет,Октава,Метонимия,Рефрен,Буриме,Рондо,Стопа}'),
  ('Остров', '{Лусон,Ньюфаундленд,Хайнань,Сахалин,Гаити,Ява,Минданао,Девон,Тимор,Виктория,Хонсю,Хайвань,Шри-ланка,Элсмир,Тасмания,Банкс,Суматра}'),
  ('Обществознание', '{Плюрализм,Рента,Бартер,Альтруизм,Демпинг,Страты,Аксиология,Кадастр,Легитимный,Девальвации,Табу,Агностицизм,Вето,Харизма,Импичмент,Профицит,Облигация,Недоимка,Парадигма,Лобби}'),
  ('Геология', '{Фация,Дельты,Грабен,Морены,Коррозия,Волновод,Гумус,Геоид,Сингенез,Дюны,Эрозия,Торф,Тектониты,Гейзер,Интрузия,Сель,Лиман,Паводок,Туф,Сублимация}'),
  ('Физика', '{Радиация,Диод,Дифракция,Частота,Диффузия,Спектр,Плотность,Инерция,Нейтрон,Поляризация,Валентность,Вакуум,Гравитация,Анод,Фотоэффект,Ионизация,Излучение,Конденсация,Колебания}'),
  ('Фигура', '{Пирамида,Эллипс,Цилиндр,Параллелограмм,Куб,Дидодекаэдр,Октаэдр,Полусфера,Параллелепипед,Сфера,Ромбододекаэдр,Тетраэдр,Тетрагексаэдр,Конус,Гексатетраэдр,Гексаэдр,Икосаэдр}'),
  ('Философы', '{Кьеркегор,Конфуций,Гераклид,Локк,Гоббс,Лао-цзы,Сенека,Рассел,Диоген,Аквинский,Сократ,Бэкон,Гегель,Кант,Демокрит,Фрейд,Аврелий,Эпикур,Элейский,Юм,Декарт,Руссо,Аристотель,Вольтер,Ницше,Вернандский,Гуссерль,Соловьев,Августин,Сартр,Бердяев,Цицерон,Абеляр,Шопэнгауэр,Парменид,Спиноза}'),
  ('Рыбы', '{Змееголов,Берш,Стерлядь,Чехонь,Пескарь,Карась,Жерех,Линь,Язь,Голец,Голавль,Налим,Быстрянка,Толстолобик,Вьюн,Сазан,Уклейка,Густера,Подуст,Красноперка}'),
  ('Экономика', '{Аванс,Акселератор,Сегментация,Дефолт,Номинал,Маклер,Паритет,Эмиссия,Мораторий,Дебурс,Ликвидность,Оферта,Лизинг,Инкассо,Консигнация,Акциз,Дотации,Девальвация,Тендер,Натурализация}'),
  ('Проливы', '{Нэрса,Джонс,Ле-мер,Менай,Курочкина,Дункан,Надежды,Мессинский,Рикорда,Магелланов,Дианы,Итаки,Макино,Босфор,Гудзонов,Австрийскиий,Буссоль,Северный,Робсон}'),
  ('Спортсмены', '{Тайсон,Карлсен,Кросби,Зарипов,Гашек,Вудс,Гараничев,Карякин,Фелпс,Исинбаева,Шарапова,Карпов,Курникова,Джордан,Овечкин,Вильямс,Щеников,Дзюба,Дзагоев,Малкин}'),
  ('Писатели', '{Генри,Фицджеральд,Тэффи,Грибоедов,Шолохов,Оруэлл,Замятин,Ломоносов,Сумароков,Михалков,Чернышевский,Мамин-сибиряк,Дюма,Чехов,Гессе,Толкин,Лондон,Голдинг,Моэм,Крылов,Верн,Жуковский,Тарковский,Твен,Блаватская,Мердок,Солженицын,Маркес,Уайльд,Брэдбери,Фонвизин,Боратынский,Кизи,Стендаль,Паланик,Диккенс,Данте,Лесков,Войнич,Карамзин,Рерих,Бронте,Зюскинд,Мариенгоф,Андреев,Куприн,Гоголь,Хемингуэй,Лермонтов,Киз,Некрасов,Даль,Горький,Достоевскиий,Довлатов,Остин,Булгаков,Бунин,Кафка,Сэлинджер,Одоевский,Стокер,Пушкин,Драйзер,Мопассан,Бальмонт,Толстой,Шекспир,Сент-экзюпери,Салтыков-щедрин,Бальзак,Рид,Тургенев,Успенский,Фаулз,Гюго,Дефо}'),
  ('Скульпторы', '{Донателло,Поликлет,Бернини,Брунеллески,Дюшан,Боччони,Роден,Пракситель,Пизано,Матисс,Фальконе,Фидий,Челлини,Канова,Гауди,Микеланджело,Дега,Бранкузи,Карпо,Лоренцо}'),
  ('Ученые', '{Королев,Пифагор,Сахаров,Дарвин,Платон,Эдисон,Тесла,Склодовская-кюри,Эйлер,Кюри,Резерфорд,Ватт,Павлов,Паскаль,Пастер,Архимед,Менделеев,Стефенсон,Максвелл,Бутлеров,Лаврентьев,Маркс,Кеплер,Морзе,Лейбниц,Ньютон,Пуанкаре,Ландау,Фултон,Вернадский,Галилей,Герц,Циолковский,Мендель,Бор,Эйнштейн}'),
  ('Композиторы', '{Вагнер,Лист,Рубинштейн,Мендельсон,Паганини,Сальери,Шуман,Шуберт,Верди,Шостакович,Гуно,Шопен,Вивальди,Россини,Штитке,Гайдн,Хачатурян,Мусоргский,Доницетти,Стравинский,Штраус,Прокофьев,Рахманинов,Бах,Глинка,Моцарт,Дебюсси,Свиридов,Бородин,Бетховен,Гендель,Берлиоз,Чайковский,Глазунов,Бизе,Ипполитов-иванов,Брамс,Григ,Скрябин}'),
  ('Театр', '{Ревю,Бенуар,Колосники,Рампа,Амплуа,Мизансцена,Фурка,Апофеоз,Гастион,Этуаль,Буффонада,Софит,Ярус,Антрепренер,Бенефис,Фарс,Конфидант,Фат,Ноо,Авансцена}'),
  ('Море', '{Росса,Моусона,Критское,Адриатическое,Норвежское,Желтое,Эгейское,Гебридское,Линкольна,Яванское,Баффина,Охотское,Гренландское,Ирландское,Лаптевых,Мраморное,Аргентинское,Фиджи,Лигурийское,Берингово}'),
  ('Математика', '{Тождество,Логарифм,Вектор,Производная,Градус,Прогрессия,Косинус,Радикал,Экстремум,Аксиома,Сегмент,Сокращение,Касательная,Сечение,Хорда,Призма,Апофема,Додекаэдр,Дифференциал,Тангенс}'),
  ('Животные', '{Нумбат,Вомбат,Антилопа,Майконг,Ехидна,Капибара,Гарна,Тапир,Фенек,Акнук,Броненосец,Сайгак,Руконожка,Кайман,Носач,Агути,Нарвал,Мангуст,Канна,Вилорог}'),
  ('Химия', '{Дегазация,Реакторы,Аллотропия,Нейтрализация,Оксид,Анион,Окисление,Изотопы,Плазма,Крекинг,Катализ,Ингибиторы,Концентрация,Катализаторы,Дистилляция,Реагенты,Суспензии,Гидрат}'),
  ('Тело', '{Гипоталамус,Печень,Сухожилие,Ягодица,Поясница,Пупок,Гипофиз,Аорта,Лимфа,Кардия,Икра,Фундус,Селезенка,Кадык,Артерия,Привратник,Мозжечок,Брюшина}'),
  ('Балет', '{Райт,Арабеск,Дягилева,Апломб,Карсавина,Тур,Александрова,Пируэт,Кшесинская,Лифарь,Нереев,Партер,Бессмертнова,Рамбер,Куде-пье,Кик,Пуант,Па,Плие,Батман,Барышников,Григорович,Уланова,Лавровский,Фокин,Захарова,Жете,Дудинская,Реверанс,Либретто,Адажио,Осипова,Плисецкая,Павлова,Флэкс,Фуэте}'),
  ('Право', '{Абонемент,Аккредитив,Опричнина,Оброгация,Мандат,Сатисфакция,Саботаж,Ковернот,Вексель,Квота,Декувер,Карнет,Кворум,Канцлер,Дампо,Вестинг,Минорат,Казуистика,Агрессия,Синод}'),
  ('Поэты', '{Агнивцев,Стивенс,Инбер,Гумилев,Друнина,Есенин,Маршак,Мальденштам,Пастернак,Брюсов,Шиллер,Бернс,Гиппиус,Ахматова,Петрарка,Тушнова,Бестужев,Цветаева,Сологуб,Фет,Высоцкий,Белый,Радищев,По,Байрон,Лорка,Рождественский,Северянин,Рембо,Твардовский,Гете,Чуковский,Бодлер,Маяковский,Дикинсон,Блок,Бродский,Асадов,Евтушенко,Басе,Барто,Волошин,Гейне,Гомер,Черный,Мур,Симонов,Забалоцкий,Ходасевич,Зощенко,Анненсккий,Блейк,Ремарк,Киплинг,Набоков,Хармс,Брехт,Ахмадулина,Вознесенскиий,Мережковский}');