package trainers

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

func QueryIcons(
	sql *db.Transaction,
	count uint8,
) (
	icons []*string,
	err error,
) {
	rows, err := sql.Query(`
    SELECT
      'data:image/svg+xml;base64,' || encode("data"::bytea, 'base64') AS "data"
    FROM public.trainers_data_icons
    ORDER BY random()
    LIMIT $1
    `,
		int(count),
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var icon string
		if err = rows.Scan(&icon); err != nil {
			return nil, err
		}
		icons = append(icons, &icon)
	}

	return icons, nil
}
