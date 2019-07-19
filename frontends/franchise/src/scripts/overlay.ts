void function InitOverlay() {
  const overlayNode = document.querySelector(".overlay")
  if (!overlayNode) {
    return
  }

  overlayNode.addEventListener("click", event => {
    if (event.target === overlayNode) {
      event.preventDefault()
      event.stopPropagation()

      overlayNode.classList.remove("overlay--show")
      overlayNode.innerHTML = ""
    }
  })
}()