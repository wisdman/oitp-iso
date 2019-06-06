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

INSERT INTO private.trainers_words_column("word")
SELECT "word" AS "word" FROM public.trainers_lexicon WHERE "forColumns";

INSERT INTO private.trainers_words_lexis("wordA", "wordB", "relation")
SELECT "word" AS "wordA", unnest("antonyms") AS "wordB", 'antonyms' AS "relation" FROM public.trainers_lexicon WHERE array_length("antonyms",1) > 0;

INSERT INTO private.trainers_words_lexis("wordA", "wordB", "relation")
SELECT DISTINCT "word" AS "wordA", unnest("paronyms") AS "wordB", 'paronyms'::trainers_words_lexis_relation AS "relation" FROM public.trainers_lexicon WHERE array_length("paronyms",1) > 0;

INSERT INTO private.trainers_words_lexis("wordA", "wordB", "relation")
SELECT DISTINCT "word" AS "wordA", unnest("synonyms") AS "wordB", 'synonyms'::trainers_words_lexis_relation AS "relation" FROM public.trainers_lexicon WHERE array_length("synonyms",1) > 0;

INSERT INTO private.trainers_words_pairs("wordA", "wordB")
SELECT "word_a" AS "wordA", "word_b" AS "wordB" FROM public.trainers_lexicon_pairs;

SELECT "word" FROM public.trainers_words_column ORDER BY random()