CREATE OR REPLACE FUNCTION trainer.text_letters_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'text-letters';
  _trainerPreviewUI public.trainer_ui := 'text-letters-preview';
  _trainerPlayUI public.trainer_ui := 'text-letters';

  _lengths smallint[];
  _maxLength smallint;

  _minQuantity smallint := 3;
  _maxQuantity smallint := 10;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  SELECT array_agg(DISTINCT "length" ORDER BY "length")
  INTO STRICT _lengths
  FROM ONLY trainer.text_letters_data
  WHERE enabled
    AND trainer;

  _maxLength := _lengths[LEAST(_complexity, array_length(_lengths, 1))];
  _maxQuantity := LEAST(_minQuantity + _complexity, _maxQuantity) - random()::smallint;

  RETURN QUERY (
    WITH configs AS (
      SELECT
        (ROW_NUMBER() OVER()) * 2 AS "preview-ord",
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerPreviewUI,

          'previewTimeLimit', _previewTimeLimit,
          'playTimeLimit', 0,
          'complexity', _complexity,

          'expression', "expression"
        ) AS "preview",
        (ROW_NUMBER() OVER()) * 2 + 1 AS "config-ord",
        jsonb_build_object(
          'id', _trainer,
          'ui', _trainerPlayUI,

          'previewTimeLimit', 0,
          'playTimeLimit', _playTimeLimit,
          'complexity', _complexity,

          'runes', "runes",
          'expression', "expression"
        ) AS "config"
      FROM (
        SELECT "expression", "runes"
        FROM ONLY trainer.text_letters_data
        WHERE "length" <= _maxLength
          AND enabled
          AND trainer
        ORDER BY random()
        LIMIT _maxQuantity
      ) AS t
    )
    SELECT "config"
    FROM (
      SELECT "preview-ord" AS "ord", "preview" AS "config" FROM configs
      UNION ALL
      SELECT "config-ord" AS "ord", "config" AS "config" FROM configs
      ORDER BY "ord"
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
