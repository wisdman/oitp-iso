package main

import (
	"encoding/json"
	"net/http"

	"github.com/google/uuid"

	"github.com/wisdman/oitp-isov/api/lib/service"
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

func (api *API) Everyday2(w http.ResponseWriter, r *http.Request) {

	sql, err := api.db.Acquire()
	if err != nil {
		service.Fatal(w, err)
		return
	}

	uid, err := uuid.NewUUID()
	if err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}

	training := &Training{
		ID:          uid.String(),
		Title:       "Полная тренировка",
		Description: "Полный набор тренажеров для тестирования системы",
		TimeLimit:   7200,
	}

	var value []interface{}

	if value, err = trainers.Message(`
    <h1>Полная тренировка</h1>
    <p>Полный набор тренажеров для тестирования системы</p>
    <p>Уровень сложности: Базовый</p>
  `, "Начать тренировку"); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, value...)

	// === Разминка - Буквы
	// if value, err = trainers.TablePipeRU(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// === Разминка - Цифры
	// if value, err = trainers.TablePipeNumbers(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Поиск отличий
	if value, err = trainers.ImageDifferences(); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, value...)

	// Запоминание картинок
	// if value, err = trainers.ImageFields(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Таблицы числовые.
	// if value, err = trainers.MatrixSequence(sql, 0, 3); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Вербальный интеллект: Синонимы
	// if value, err = trainers.TextPairsSynonyms(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Вербальный интеллект: Выделить из группы (похожее)
	// if value, err = trainers.QuestionCloseWords(sql, 0, 3); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Вербальный интеллект: Антонимы
	// if value, err = trainers.TextPairsAntonyms(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Вербальный интеллект: Выделить из группы (лишнее)
	// if value, err = trainers.QuestionWasteWords(sql, 0, 3); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Вербальный интеллект: Паронимы
	// if value, err = trainers.TextPairsParonyms(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Таблицы с картинками. Фигуры. Картинки. Буквы. Смесь
	// if value, err = trainers.MatrixFillingIcons(sql, 0, 3); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// === Текст.  Чтение ===
	// if value, err = trainers.TextReading(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Арифметико-практическое мышление. Серии
	// if value, err = trainers.QuestionMathSeries(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Арифметико-практическое мышление. Среднее число
	// if value, err = trainers.QuestionMathMiddle(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Активизация лексикона. Слова по группам
	// if value, err = trainers.ClassificationWords(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Активизация лексикона. Цвета по группам
	// if value, err = trainers.ClassificationColors(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Афоризмы. Первые буквы слов
	// if value, err = trainers.TextLetters(sql, 0, 5); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Мнемотехника. Восстановите таблицу по памяти. Все уникальные
	// if value, err = trainers.MatrixFillingUnique(sql, 0, 3); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	//  Пространство, логика (разобрать учебник). Лишняя фигура
	if value, err = trainers.QuestionLogicsWaste(sql, 0); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, value...)

	// Мнемотехника. Столбики. Сортировка
	if value, err = trainers.TextSort(sql, 0); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, value...)

	// Запомнить и выбрать пары
	// if value, err = trainers.TextPairsSpecific(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Тезирование.
	// if value, err = trainers.TextTezirovanie(sql, 0); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// Таблицы числовые. Случайные
	// if value, err = trainers.MatrixRandomSequence(sql, 0, 3); err != nil {
	// 	service.Fatal(w, err)
	// 	sql.Rollback()
	// 	return
	// }
	// training.Trainers = append(training.Trainers, value...)

	// TODO: Коврики (Фигуры, Символы, Геометрия)
	// TODO: Поиск отличий
	// TODO: Пространство, логика (разобрать учебник)

	// Отобразить результаты
	if value, err = trainers.Result(); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, value...)

	// Отобразить результаты
	if value, err = trainers.Result(); err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}
	training.Trainers = append(training.Trainers, value...)

	if err = sql.Commit(); err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(training)
}
