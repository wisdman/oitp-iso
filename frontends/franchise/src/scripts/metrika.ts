void function YandexMetrika(window, callbackName) {
  const METRIKA_ID = 49881337

  ;(window[callbackName] = window[callbackName] || []).push(function() {
    try {
      window[`yaCounter${METRIKA_ID}`] = new window.Ya.Metrika2({
        id: METRIKA_ID,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      })
    } catch (_) {}
  })

  const script = document.createElement("script")
  script.type = "text/javascript"
  script.async = true
  script.src = "//mc.yandex.ru/metrika/tag.js"
  document.head.appendChild(script)
}(window as any, "yandex_metrika_callbacks2")
