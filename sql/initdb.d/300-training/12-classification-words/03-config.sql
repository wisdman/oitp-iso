SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.classification_words_config() RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'classification-words';
  _trainerUI public.trainer_ui := 'classification-words';

  _minGroups smallint := 2;
  _maxGroups smallint := 6;

  _minItems smallint := 3;
  _maxItems smallint := 5;

  _previewTimeLimit int;
  _playTimeLimit int;
  _complexity smallint;
BEGIN
  SELECT "previewTimeLimit", "playTimeLimit", "complexity"
  INTO STRICT _previewTimeLimit, _playTimeLimit, _complexity
  FROM private.get_complexity(_trainer, current_setting('app.sessionUser', true)::uuid);

  _maxGroups := LEAST(_minGroups + _complexity, _maxGroups) - random()::smallint;
  _maxItems := LEAST(_minItems + _complexity, _maxItems) - random()::smallint;

  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', 0,
        'playTimeLimit', _playTimeLimit,
        'complexity', _complexity,

        'items', jsonb_agg(jsonb_build_object(
          'group', "group",
          'words', "words"
        ))
      )
    FROM (
      SELECT
        "group",
        (SELECT array_agg(v ORDER BY random()) FROM unnest("words") v)[1:_maxItems] AS "words"
      FROM ONLY trainer.classification_words_data
      WHERE "enabled"
      ORDER BY random()
      LIMIT _maxGroups
    ) AS t
  );
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
