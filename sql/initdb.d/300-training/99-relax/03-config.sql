SET search_path = "$user";

CREATE OR REPLACE FUNCTION trainer.relax_config(_quantity int) RETURNS SETOF jsonb AS $$
DECLARE
  _trainer public.trainer_type := 'relax';
  _trainerUI public.trainer_ui := 'relax';

  _previewTimeLimit int := 10000;
BEGIN
  RETURN QUERY (
    SELECT
      jsonb_build_object(
        'id', _trainer,
        'ui', _trainerUI,

        'previewTimeLimit', _previewTimeLimit,

        'image', "image",
        'expression', "expression"
      )
    FROM (
      SELECT ROW_NUMBER() OVER () AS "id", "image"
      FROM trainer.get_relax_image(_quantity) AS "image"
    ) AS t1, (
      SELECT ROW_NUMBER() OVER () AS "id", "expression"
      FROM (
        SELECT "expression"
        FROM ONLY trainer.relax_data
        WHERE enabled
        ORDER BY random()
        LIMIT _quantity
      ) AS _
    ) AS t2
    WHERE t1."id" = t2."id"
  );
END $$ LANGUAGE plpgsql VOLATILE;
