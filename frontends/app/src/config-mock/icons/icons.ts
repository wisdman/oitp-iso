
const ICONS_COUNT = 188
const ICONS = Array.from(Array(ICONS_COUNT), (_,i) => `/icons/${i+1}.svg`)

export function fetchRandomIcons(length: number = 1) {
  const arr = ICONS.sort(() => Math.random() - 0.5)
                   .slice(0, length)

  return Promise.all(
    arr.map(url =>
            fetch(url)
            .then(response => response.text())
            .then(text => "data:image/svg+xml;base64," + window.btoa(text))
          )
  )
}
