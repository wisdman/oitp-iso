void function VKInit(window, vk) {
  const script = document.createElement("script")
  script.type = "text/javascript"
  script.async = true

  script.onload = function() {
    window[vk].Retargeting.Init("VK-RTRG-306364-8I0P4")
    window[vk].Retargeting.Hit()
  }

  script.src = "https://vk.com/js/api/openapi.js?159"
  document.head.appendChild(script)
}(window as any, "VK")
