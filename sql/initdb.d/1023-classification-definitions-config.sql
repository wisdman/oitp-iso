SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.classification_definitions_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'classification-definitions';
  _trainerUI public.trainer_ui := 'classification-definitions';

  _minItems smallint := 3;
  _maxItems smallint := 12;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxItems := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', _previewTimeLimit,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', jsonb_agg(jsonb_build_object(
          'data', "word",
          'definition', (SELECT array_agg(v ORDER BY random()) FROM unnest("definitions") v)[1]
        ))
      )
    FROM (
      SELECT "word", "definitions"
      FROM trainer.classification_definitions_data
      WHERE "deleted" IS NULL
        AND "enabled"
      ORDER BY random()
      LIMIT _maxItems
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE;
