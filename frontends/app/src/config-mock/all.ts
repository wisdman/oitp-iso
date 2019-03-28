
import {
  ITrainerConfigs
} from "../trainers"

import {
  // getClassificationColorsTrainerConfig,
  // getClassificationImagesTrainerConfig,
  // getClassificationWordsTrainerConfig,
  // getImageCarpetTrainerConfigs,
  // getImageDifferencesTrainerConfigs,
  // getImageFieldsTrainerConfigs,
  // getMatrixFillingFiguresTrainerConfigs,
  // getMatrixFillingImagesTrainerConfigs,
  // getMatrixFillingLettersTrainerConfigs,
  // getMatrixFillingRandomFiguresTrainerConfigs,
  // getMatrixFillingRandomImagesTrainerConfigs,
  // getMatrixFillingRandomLettersTrainerConfigs,
  // getMatrixSequenceNumbersTrainerConfigs,
  // getMatrixSequenceRandomNumbersTrainerConfigs,
  getMessageTrainerConfig,
  getResultTrainerConfig,
  // getTablePipeLettersTrainerConfig,
  // getTextLettersTrainerConfig,
  // getTextPairsTrainerConfig,
  // getTextSortTrainerConfig,
  // getTextTezirovanieReadTrainerConfig,
  // getTextTezirovanieTrainerConfig,
  // getMathQTrainerConfig,
  // getTextTezirovanieReadQTrainerConfig,
} from "./trainers"

export async function ALL_TRAINERS(): Promise<Array<ITrainerConfigs>> {

  return [

    await getMessageTrainerConfig({
      header: "Тут пока пусто",
      button: "Увы!",
    }),

    await getResultTrainerConfig(50),
  ]
}
