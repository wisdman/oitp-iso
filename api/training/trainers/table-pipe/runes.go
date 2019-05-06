package tablePipe

import (
	"math/rand"
	"time"
)

type IRunes uint8

const (
	RunesEN IRunes = iota
	RunesRU
	RunesNUMBERS
)

var arr_ALPHABET_EN = [...]rune{'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'}

var arr_ALPHABET_RU = [...]rune{'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Э', 'Ю', 'Я'}

var arr_NUMBERS = [...]rune{'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}

func getRunes(itemsType IRunes) []rune {
	rand.Seed(time.Now().UnixNano())

	switch itemsType {
	case RunesEN:
		length := len(arr_ALPHABET_EN)
		items := make([]rune, length)
		for i := 0; i < length; i++ {
			items[i] = arr_ALPHABET_EN[i]
		}
		rand.Shuffle(length, func(i, j int) { items[i], items[j] = items[j], items[i] })
		return items[0:len(actions)]

	case RunesRU:
		length := len(arr_ALPHABET_RU)
		items := make([]rune, length)
		for i := 0; i < length; i++ {
			items[i] = arr_ALPHABET_RU[i]
		}
		rand.Shuffle(length, func(i, j int) { items[i], items[j] = items[j], items[i] })
		return items[0:len(actions)]

	case RunesNUMBERS:
		length := len(arr_NUMBERS)
		items := make([]rune, length)
		for i := 0; i < length; i++ {
			items[i] = arr_NUMBERS[i]
		}
		rand.Shuffle(length, func(i, j int) { items[i], items[j] = items[j], items[i] })
		return items[0:len(actions)]
	}

	return make([]rune, 0)
}
