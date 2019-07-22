void function RequestFormInit() {
  const requestForm = document.querySelector<HTMLFormElement>(".request-form")
  if (!requestForm) {
    return
  }

  let isSended = false

  requestForm.addEventListener("submit", event => {
    event.preventDefault()
    event.stopPropagation()

    if (isSended) return
    isSended = true

    requestForm.classList.add("request-form--loader")

    const formData = new FormData(requestForm)

    const searchParams = Array.from(formData.entries()).map(([key, value]) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(String(value))
    }).join('&')

    const url = requestForm.getAttribute("action")
    if (url === null) {
       requestForm.classList.add("request-form--error")
       return
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: searchParams,
    })
    .then(() => {
      requestForm.classList.remove("request-form--loader")
      requestForm.classList.add("request-form--success")
    })
    .catch(() => {
      requestForm.classList.remove("request-form--loader")
      requestForm.classList.add("request-form--error")
    })
  })
}()
