INSERT INTO private.trainers_text_reading("data", "questions")(
  SELECT
    t."data" as "data",
    COALESCE(
      json_agg(
        json_build_object(
          'data', REGEXP_REPLACE(q.body,'<[^>]+>','','g'),
          'correct', q.correct
        )
      ) FILTER (WHERE q."id" IS NOT NULL),
      '[]'
    ) AS "questions"
  FROM private.trainers_texts t
  LEFT JOIN private.trainers_texts_questions r ON r."text_id" = t."id"
  LEFT JOIN (
    SELECT
      id,
      body AS "body",
      (a->>'data' = 'Истина') AS "correct"
    FROM (
      SELECT
        id,
        body,
        jsonb_array_elements(items) AS "a"
      FROM
        private.trainers_questions
      WHERE
        type = 'text'
    ) t1
    WHERE
    (a->'correct')::boolean
  ) q ON r."question_id" = q."id"
  WHERE t."type" = 'reading'
  GROUP BY t."id"
)

UPDATE public.trainers_text_tezirovanie SET data = replace(data,'&nbsp;',' ') WHERE data LIKE '%&nbsp;%';
UPDATE public.trainers_text_tezirovanie SET data = regexp_replace(data,'\s+',' ','g');
UPDATE public.trainers_text_tezirovanie SET data = regexp_replace(data,'\s+<\/p','','g');
UPDATE public.trainers_text_tezirovanie SET data = regexp_replace(data,'<h1>\s*<\/h1>','','g');
UPDATE public.trainers_text_tezirovanie SET data = regexp_replace(data,'\s+',' ','g');

UPDATE public.trainers_text_tezirovanie SET data = regexp_replace(data,'>','','g');