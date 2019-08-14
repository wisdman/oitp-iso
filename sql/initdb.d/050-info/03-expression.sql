CREATE OR REPLACE FUNCTION public.get_info_expression(OUT _info jsonb) AS $$
BEGIN
  SELECT
    jsonb_build_object(
      'type', 'text',
      'data', "expression",
      'href', NULL,
      'target', '_blank'
    ) INTO STRICT _info
  FROM (
    SELECT "expression"
    FROM trainer.text_letters_data
    WHERE enabled
      AND public
    ORDER BY random()
    LIMIT 1
  ) AS t;
END;
$$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
