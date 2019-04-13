SET search_path = "$user";

INSERT INTO private.trainers_data_classification_words("title", "words") VALUES
 ('Актеры', ARRAY['Баталов','Бодров','Брусникин','Васильева','Глаголева','Горошина','Державин','Ельчин','Караченцев','Карпова','Леджер','Лях','Мерфи','Михалковский','Муратова','Сенчина','Тихонов','Фомкин','Харлоу','Цой']),
 ('Балет', ARRAY['Адажио','Александрова','Ан фас','Апломб','Арабеск','Барышников','Батман','Бессмертнова','Григорович','Дудинская','Дягилева','Жете','Захарова','Карсавина','Кик','Куде-пье','Кшесинская','Ла Фонтен','Лавровский','Либретто','Лифарь','Нереев','Осипова','Па','Павлова','Партер','Пируэт','Плие','Плисецкая','Пор де бра','Пуант','Райт','Рамбер','Реверанс','Ролл ап','Тур','Уланова','Флэкс','Фокин','Фуэте']),
 ('Геология', ARRAY['Волновод','Гейзер','Геоид','Грабен','Гумус','Дельты','Дюны','Интрузия','Коррозия','Лиман','Морены','Паводок','Сель','Сингенез','Сублимация','Тектониты','Торф','Туф','Фация','Эрозия']),
 ('Геополитика', ARRAY['','Автаркия','Антисистема','Атлантизм','Аэрократия','Геостратегия','Евразийство','Идеократия','Интеграция','Левиафан','Медиакратия','Метаполе','Мондиализм','Номос','Пассионарность','Периферия','Симбиоз','Химера','Экспансия','Этногенез','Этнос']),
 ('Живопись', ARRAY['Акцент','Блик','Витраж','Гризайль','Жухлость','Иллюзорность','Импрессионизм','Контраст','Кроки','Моделировка','Пастозность','Перспектива','Пестрота','Примитивизм','Реализм','Рефлекс','Тональность','Фактура','Фреска','Энкаустика']),
 ('Животные', ARRAY['Агути','Акнук','Антилопа','Броненосец','Вилорог','Вомбат','Гарна','Ехидна','Кайман','Канна','Капибара','Майконг','Мангуст','Нарвал','Носач','Нумбат','Руконожка','Сайгак','Тапир','Фенек']),
 ('История', ARRAY['Антанта','Ассамблеи','Вече','Губерния','Гулаг','Депортация','Диссидент','Интервенция','Картель','Колонизация','Конверсия','Ликбез','Посад','Приватизация','Путч','Смерд','Сословие','Ударник','Хутор','Челядь']),
 ('Кино', ARRAY['Вертиго','Гэг','Зум','Камео','Колоризация','Короткомет','Монтаж','Перебивка','Петличка','Питчинг','Приквел','Ракурс','Рапид','Реверс','Реквизит','Саундтрек','Сиквел','Твист','Футадж','Экспони','ражка','ровние']),
 ('Композиторы', ARRAY['Бах','Берлиоз','Бетховен','Бизе','Бородин','Брамс','Вагнер','Верди','Вивальди','Гайдн','Гендель','Глазунов','Глинка','Григ','Гуно','Дебюсси','Доницетти','Ипполитов-Иванов','Лист','Мендельсон','Моцарт','Мусоргский','Паганини','Прокофьев','Рахманинов','Россини','Рубинштейн','Сальери','Свиридов','Скрябин','Стравинский','Хачатурян','Чайковский','Шопен','Шостакович','Штитке','Штраус','Шуберт','Шуман']),
 ('Компьютер', ARRAY['Авторизация','Апгрейд','Баг','Болванка','Деинсталляция','Джойстик','Дискета','Драйвер','Интерфейс','Курсор','Лагер','Модератор','Плагин','Роутер','Сервер','Софт','Торрент','Троян','Фейк','Хост']),
 ('Литература', ARRAY['Аллитерация','Амфибрахий','Буриме','Бурлеск','Кантата','Клаузула','Кода','Лаконизм','Метонимия','Октава','Памфлет','Пасквиль','Прототип','Рефрен','Рондо','Стопа','Троп','Фабула','Фельетон','Эвфемизм']),
 ('Математика', ARRAY['Аксиома','Апофема','Вектор','Градус','Дифференциал','Додекаэдр','Касательная','Косинус','Логарифм','Призма','Прогрессия','Производная','Радикал','Сегмент','Сечение','Сокращение','Тангенс','Тождество','Хорда','Экстремум']),
 ('Медицина', ARRAY['Антидот','Астения','Аутотренинг','Аффект','Булимия','Гемосорбция','Дисфория','Допинг','Катарсис','Нейролептики','Паранойя','Псевдология','Психосоматика','Пульсоксиметр','Ремиссия','Симуляция','Сома','Тремор','Фрустрация']),
 ('Море', ARRAY['Адриатическое','Аргентинское','Баффина','Берингово','Гебридское','Гренландское','Желтое','Ирландское','Критское','Лаптевых','Лигурийское','Линкольна','Моусона','Мраморное','Норвежское','Охотское','Росса','Фиджи','Эгейское','Яванское']),
 ('Музыка', ARRAY['Альт','Аранжировка','Бекар','Гриф','Диатоника','Диссонанс','Затакт','Кабалетта','Квинтет','Кластер','Лютня','Модуляция','Полутон','Реприза','Свинг','Септет','Синкопа','Тесситура','Тоника','Трель']),
 ('Насекомые', ARRAY['Бражник','Восковик','Грибоед','Зерновка','Медведка','Москит','Мягкотелка','Навозник','Овод','Палочник','Плавунец','Радужница','Саранча','Слепень','Тля','Хрущ','Цикадка','Шершень','Щелкун']),
 ('Обществознание', ARRAY['Агностицизм','Аксиология','Альтруизм','Бартер','Вето','Девальвации','Демпинг','Импичмент','Кадастр','Легитимный','Лобби','Недоимка','Облигация','Парадигма','Плюрализм','Профицит','Рента','Страты','Табу','Харизма']),
 ('Остров', ARRAY['Банкс','Баффинова Земля','Виктория','Гаити','Девон','Лусон','Минданао','Ньюфаундленд','Принца Уэльского','Сахалин','Суматра','Тасмания','Тимор','Хайвань','Хайнань','Хонсю','Шри-Ланка','Элсмир','Ява']),
 ('Писатели', ARRAY['Агата Кристи','Андреев','Бальзак','Бальмонт','Блаватская','Боратынский','Бронте','Брэдбери','Булгаков','Бунин','Верн','Войнич','Генри','Гессе','Гоголь','Голдинг','Горький','Грибоедов','Гюго','Даль','Данте','Державин','Дефо','Диккенс','Довлатов','Достоевскиий','Драйзер','Дюма','Жуковский','Замятин','Зюскинд','Карамзин','Кафка','Киз','Кизи','Крылов','Куприн','Лермонтов','Лесков','Ломоносов','Лондон','Мамин-Сибиряк','Мариенгоф','Маркес','Мердок','Михалков','Мопассан','Моэм','Некрасов','Одоевский','Оруэлл','Остин','Паланик','Пушкин','Рерих','Рид','Салтыков-Щедрин','Сент-Экзюпери','Солженицын','Стендаль','Стокер','Сумароков','Сэлинджер','Тарковский','Твен','Толкин','Толстой','Тургенев','Тэффи','Уайльд','Успенский','Фаулз','Фицджеральд','Фонвизин','Хемингуэй','Чернышевский','Чехов','Шекспир','Шолохов']),
 ('Поэты', ARRAY['Агнивцев','Анненсккий','Асадов','Ахмадулина','Ахматова','Байрон','Бальмонт','Барто','Басе','Белый','Бернс','Бестужев','Блейк','Блок','Бодлер','Брехт','Бродский','Брюсов','Бунин','Вознесенскиий','Волошин','Высоцкий','Гейне','Гете','Гиппиус','Гомер','Грибоедов','Гумилев','Державин','Дикинсон','Друнина','Евтушенко','Есенин','Жуковский','Забалоцкий','Зощенко','Инбер','Киплинг','Крылов','Лермонтов','Ломоносов','Лорка','Мальденштам','Маршак','Маяковский','Мережковский','Мур','Набоков','Некрасов','Одоевский','Омар Хаям','Пастернак','Петрарка','По','Пушкин','Радищев','Ремарк','Рембо','Рерих','Рождественский','Северянин','Симонов','Сологуб','Стивенс','Сумароков','Твардовский','Толстой','Тургенев','Тушнова','Тэффи','Уайльд','Фет','Хармс','Ходасевич','Цветаева','Черный','Чуковский','Шекспир','Шиллер']),
 ('Право', ARRAY['','Абонемент','Агрессия','Аккредитив','Вексель','Вестинг','Дампо','Декувер','Казуистика','Канцлер','Карнет','Кворум','Квота','Ковернот','Мандат','Минорат','Оброгация','Опричнина','Саботаж','Сатисфакция','Синод']),
 ('Проливы', ARRAY['Австрийскиий','Босфор','Буссоль','Гудзонов','Джонс','Дианы','Дункан','Итаки','Курочкина','Ле-Мер','Магелланов','Макино','Менай','Мессинский','Надежды','Нэрса','Ольховские Ворота','Рикорда','Робсон','Северный']),
 ('Режиссеры', ARRAY['Бергман','Бондарчук','Гайдай','Гриффит','Данелия','Захаров','Кубрик','Куросава','Масленников','Меньшов','Немирович-Данченко','Ростоцкий','Рязанов','Станиславский','Тарковский','Феллини','Форд','Хичкок','Чаплин','Эйзенштейн']),
 ('Реки', ARRAY['Авнюга','Амга','Анадырь','Ангара','Бирюса','Витим','Вятка','Демьянка','Дон','Кама','Кеть','Марха','Оленёк','Онон','Печора','Тавда','Тура','Урал','Чулым']),
 ('Русский язык', ARRAY['Апостроф','Градация','Дискурс','Инфинитив','Каламбур','Клинопись','Клише','Лигатура','Метатеза','Полисемия','Семиотика','Синекдоха','Сленг','Соподчинение','Спряжение','Табу','Умолчание','Фонология']),
 ('Рыбы', ARRAY['Берш','Быстрянка','Вьюн','Голавль','Голец','Густера','Жерех','Змееголов','Карась','Красноперка','Линь','Налим','Пескарь','Подуст','Сазан','Стерлядь','Толстолобик','Уклейка','Чехонь','Язь']),
 ('Скульпторы', ARRAY['Бернини','Боччони','Бранкузи','Брунеллески','Гауди','Дега','Донателло','Дюшан','Канова','Карпо','Лоренцо','Матисс','Микеланджело','Пизано','Поликлет','Пракситель','Роден','Фальконе','Фидий','Челлини']),
 ('Спортсмены', ARRAY['Вильямс','Вудс','Гараничев','Гашек','Джордан','Дзагоев','Дзюба','Зарипов','Исинбаева','Карлсен','Карпов','Карякин','Кросби','Курникова','Малкин','Овечкин','Тайсон','Фелпс','Шарапова','Щеников']),
 ('Столицы', ARRAY['Амман','Астана','Валлетта','Габароне','Дили','Доха','Каракас','Катманду','Кигали','Манама','Порт-Луи','Порто-Ново','Прая','Розо','Сан-Хосе','Сана','Сукре','Триполи','Ханой','Яунде']),
 ('Страны', ARRAY['Бангладеш','Бахрейн','Бруней','Буркина-Фасо','Бутан','Вануату','Гондурас','Гренада','Йемен','Камерун','Катар','Кения','Косово','Коста-Рика','Либерия','Ливия','Марокко','Непал','Нигер','Палау']),
 ('Театр', ARRAY['Авансцена','Амплуа','Антрепренер','Апофеоз','Бенефис','Бенуар','Буффонада','Гастион','Колосники','Конфидант','Мизансцена','Ноо','Рампа','Ревю','Софит','Фарс','Фат','Фурка','Этуаль','Ярус']),
 ('Тело', ARRAY['Аорта','Артерия','Брюшина','Гипоталамус','Гипофиз','Икра','Кадык','Кардия','Лимфа','Мозжечок','Печень','Поясница','Привратник','Пупок','Селезенка','Стопа','Сухожилие','Фундус','Ягодица']),
 ('Ученые', ARRAY['Архимед','Бор','Бутлеров','Ватт','Вернадский','Галилей','Герц','Дарвин','Жуковский','Кеплер','Королев','Кюри','Лаврентьев','Ландау','Лейбниц','Леонардо да Винчи','Ломоносов','Максвелл','Маркс','Менделеев','Мендель','Морзе','Ньютон','Павлов','Паскаль','Пастер','Пифагор','Платон','Пуанкаре','Резерфорд','Сахаров','Склодовская-Кюри','Стефенсон','Тесла','Фултон','Циолковский','Эдисон','Эйлер','Эйнштейн']),
 ('Фигура', ARRAY['Гексатетраэдр','Гексаэдр','Дидодекаэдр','Додекаэдр','Икосаэдр','Конус','Куб','Октаэдр','Параллелепипед','Параллелограмм','Пирамида','Полусфера','Призма','Ромбододекаэдр','Сфера','Тетрагексаэдр','Тетраэдр','Цилиндр','Эллипс']),
 ('Физика', ARRAY['Анод','Вакуум','Валентность','Герц','Гравитация','Диод','Дифракция','Диффузия','Излучение','Инерция','Ионизация','Колебания','Конденсация','Нейтрон','Плотность','Поляризация','Радиация','Спектр','Фотоэффект','Частота']),
 ('Философы', ARRAY['Абеляр','Августин','Аврелий','Аквинский','Аристотель','Бердяев','Бэкон','Вернандский','Вольтер','Гегель','Гераклид','Гоббс','Гуссерль','Декарт','Демокрит','Диоген','Кант','Конфуций','Кьеркегор','Лао-Цзы','Лейбниц','Локк','Ницше','Парменид','Пифагор','Платон','Рассел','Руссо','Сартр','Сенека','Сократ','Соловьев','Спиноза','Фрейд','Цицерон','Шопэнгауэр','Элейский','Эпикур','Юм']),
 ('Химия', ARRAY['Аллотропия','Анион','Валентность','Гидрат','Дегазация','Дистилляция','Изотопы','Ингибиторы','Катализ','Катализаторы','Концентрация','Крекинг','Нейтрализация','Окисление','Оксид','Плазма','Поляризация','Реагенты','Реакторы','Суспензии']),
 ('Художники', ARRAY['Айвазовский','Бакст','Беллини','Босх','Брюллов','Ван Гог','Ван Рейн','Васнецов','Веласкес','Веницианов','Верещагин','Вермеер','Врубель','Ге','Гоген','Горчарова','Дали','Дега','Дейнека','Иванов','Кандинский','Караваджо','Кипренский','Коровин','Крамской','Куиджи','Кустодиев','Левитан','Леонардо да Винчи','Маковский','Мане','Модельяни','Моне','Мунк','Муха','Мясоедов','Нестеров','Перов','Петров-Водкин','Пикассо','Поленов','Пуссен','Рафаэль','Рембрант','Репин','Рерих','Рубенс','Саврасов','Санти','Серебрякова','Серов','Суриков','Тернер','Тициан','Тулуз-Лотрек','Шагал','Шишкин','Эйк']),
 ('Экономика', ARRAY['Аванс','Акселератор','Акциз','Дебурс','Девальвация','Дефолт','Дотации','Инкассо','Консигнация','Лизинг','Ликвидность','Маклер','Мораторий','Натурализация','Номинал','Оферта','Паритет','Сегментация','Тендер','Эмиссия']);