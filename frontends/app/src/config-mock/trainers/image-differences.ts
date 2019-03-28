import { UUID } from "../uuid"

import {
  IImageDifferencesTrainerConfig
} from "../../trainers"

// function fetchDiff():  Promise<Array<[string, string, Array<string>]>> {
  // return fetch("/differences.json").then(response => response.json())
// }

const DIFFERENCES_COUNT = 25
const DIFFERENCES = Array.from(Array(DIFFERENCES_COUNT), (_,i) => [i*2+1, i*2+2])
                         .map(([A, B]) => [`/differences/${A}.svg`, `/differences/${B}.svg`])

function fetchImage(url: string) {
  return fetch(url)
          .then(response => response.text())
          .then(text => "data:image/svg+xml;base64," + window.btoa(text))
}


export async function getImageDifferencesTrainerConfigs(
): Promise<[IImageDifferencesTrainerConfig, IImageDifferencesTrainerConfig]> {

  const [imageAurl, imageBurl] = DIFFERENCES.sort(() => Math.random() - 0.5)[0]

  const imageA = await fetchImage(imageAurl)
  const imageB = await fetchImage(imageBurl)
  const differences: Array<string> = []

  // const images = await fetchDiff()
  // const [imageA, imageB, differences] = images.sort(() => Math.random() - 0.5)[0]

  const config:IImageDifferencesTrainerConfig = {
    id: "image-differences",
    uid: new UUID(1).toString(),
    mode: "show",
    image: imageA,
  }

  return [config ,{...config, image: imageB, differences, mode: "play" }]
}
