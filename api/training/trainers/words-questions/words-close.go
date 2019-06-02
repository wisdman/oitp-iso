// Активизация лексикона
//
// Слово - это ...
//

package wordsQuestion

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	// "github.com/wisdman/oitp-isov/api/lib/w-rand"
)

var complexityCloseData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 30,
		Quantity:      3,
	},
	Parameters{
		PlayTimeLimit: 20,
		Quantity:      3,
	},
	Parameters{
		PlayTimeLimit: 10,
		Quantity:      3,
	},
}

func BuildClose(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	// params := complexityCloseData[complexity]

	// rows, err := sql.Query(`
	//    SELECT
	//      "items"
	//    FROM public.trainers_questions
	//    WHERE type = 'words-close'
	//    ORDER BY random()
	//    LIMIT $1
	//    `,
	// 	params.Quantity,
	// )
	// if err != nil {
	// 	return nil, err
	// }
	// defer rows.Close()

	// for rows.Next() {
	// 	config := newConfig(params)
	// 	if err = rows.Scan(&config.Items); err != nil {
	// 		return nil, err
	// 	}
	// 	wRand.Shuffle(len(config.Items), func(i, j int) { config.Items[i], config.Items[j] = config.Items[j], config.Items[i] })
	// 	configs = append(configs, config)
	// }

	return configs, nil
}
