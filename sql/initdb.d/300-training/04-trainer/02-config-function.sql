CREATE OR REPLACE FUNCTION private.trainer_config(_trainer public.trainer_type) RETURNS SETOF jsonb AS $$
BEGIN
  CASE _trainer
    WHEN 'classification-colors' THEN
      RETURN QUERY SELECT trainer.classification_colors_config();
    WHEN 'classification-definitions' THEN
      RETURN QUERY SELECT trainer.classification_definitions_config();
    WHEN 'classification-words' THEN
      RETURN QUERY SELECT trainer.classification_words_config();
    WHEN 'image-carpets' THEN
      RETURN QUERY SELECT trainer.image_carpets_config();
    WHEN 'image-differences' THEN
      RETURN QUERY SELECT trainer.image_differences_config();
    WHEN 'image-expressions' THEN
      RETURN QUERY SELECT trainer.image_expressions_config();
    WHEN 'image-fields' THEN
      RETURN QUERY SELECT trainer.image_fields_config();
    WHEN 'math-equation' THEN
      RETURN QUERY SELECT trainer.math_equation_config();
    WHEN 'math-middle' THEN
      RETURN QUERY SELECT trainer.math_middle_config();
    WHEN 'math-sequence' THEN
      RETURN QUERY SELECT trainer.math_sequence_config();
    WHEN 'math-waste' THEN
      RETURN QUERY SELECT trainer.math_waste_config();
    WHEN 'matrix-filling-pattern' THEN
      RETURN QUERY SELECT trainer.matrix_filling_pattern_config();
    WHEN 'matrix-filling-unique' THEN
      RETURN QUERY SELECT trainer.matrix_filling_unique_config();
    WHEN 'matrix-sequence-pattern' THEN
      RETURN QUERY SELECT trainer.matrix_sequence_pattern_config();
    WHEN 'matrix-sequence-random' THEN
      RETURN QUERY SELECT trainer.matrix_sequence_random_config();
    WHEN 'space-waste-2d' THEN
      RETURN QUERY SELECT trainer.space_waste_2d_config();
    WHEN 'space-waste-3d' THEN
      RETURN QUERY SELECT trainer.space_waste_3d_config();
    WHEN 'storytelling' THEN
      RETURN QUERY SELECT trainer.storytelling_config();
    WHEN 'table-pipe' THEN
      RETURN QUERY SELECT trainer.table_pipe_config();
    WHEN 'text-letters' THEN
      RETURN QUERY SELECT trainer.text_letters_config();
    WHEN 'text-reading' THEN
      RETURN QUERY SELECT trainer.text_reading_config();
    WHEN 'text-tezirovanie' THEN
      RETURN QUERY SELECT trainer.text_tezirovanie_config();
    WHEN 'words-column' THEN
      RETURN QUERY SELECT trainer.words_column_config();
    WHEN 'words-filling' THEN
      RETURN QUERY SELECT trainer.words_filling_config();
    WHEN 'words-lexis-antonyms' THEN
      RETURN QUERY SELECT trainer.words_lexis_antonyms_config();
    WHEN 'words-lexis-paronyms' THEN
      RETURN QUERY SELECT trainer.words_lexis_paronyms_config();
    WHEN 'words-lexis-synonyms' THEN
      RETURN QUERY SELECT trainer.words_lexis_synonyms_config();
    WHEN 'words-pairs' THEN
      RETURN QUERY SELECT trainer.words_pairs_config();
    WHEN 'words-questions-close' THEN
      RETURN QUERY SELECT trainer.words_questions_close_config();
    WHEN 'words-questions-waste'  THEN
      RETURN QUERY SELECT trainer.words_questions_waste_config();
  END CASE;
END $$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;
