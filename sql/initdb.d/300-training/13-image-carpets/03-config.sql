SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.image_carpets__config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'image-carpets';
  _trainerUI public.trainer_ui := 'image-carpets';

  _minQuantity smallint := 2;
  _maxQuantity smallint := 10;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxQuantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;

  RETURN QUERY (
    SELECT
      "value" || jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'itemId', "id",

        'colors', (SELECT array_agg(c) FROM trainer.get_colors(t."maxColor" + 1) AS c)
      ) AS "config"
    FROM (
      SELECT "id", "value", "maxColor"
      FROM ONLY trainer.image_carpets_data
      WHERE "enabled"
        AND "complexity" <= _complexity
      ORDER BY random()
      LIMIT _maxQuantity
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
