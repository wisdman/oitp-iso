
void function InitTextReview() {
  const overlay = document.querySelector(".overlay")
  if (!overlay) {
    return
  }

  document.querySelectorAll(".review-item--text")
          .forEach(articleNode => {
            articleNode.addEventListener("click", (event: Event) => {
              event.preventDefault()
              event.stopPropagation()

              const divNode = document.createElement("div")
              divNode.classList.add("overlay__box")
              divNode.innerHTML = articleNode.innerHTML

              overlay.innerHTML = ""
              overlay.appendChild(divNode)
              overlay.classList.add("overlay--show")
            })
          })
}()
