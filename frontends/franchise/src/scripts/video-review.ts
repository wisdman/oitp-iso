
void function InitVideo() {
  const overlay = document.querySelector(".overlay")
  if (!overlay) {
    return
  }

  document.querySelectorAll(".review-item--video")
          .forEach(videoNode => {
            const link = videoNode.querySelector(".review-item__video-link")
            const button = videoNode.querySelector(".review-item__video-button")

            if (!link || !button) {
              throw "Incorrect review-item--video layput"
            }

            const href = link.getAttribute("href")
            if (!href) {
              return
            }

            const m = href.match(/[^\/]+$/i)
            if (!m) {
              return
            }

            const id = m[0]

            videoNode.addEventListener("click", (event: Event) => {
              event.preventDefault()
              event.stopPropagation()

              const iframeNode = document.createElement("iframe")
              iframeNode.setAttribute("allowfullscreen", "")
              iframeNode.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture")
              iframeNode.setAttribute("src", `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&autoplay=1`)
              iframeNode.setAttribute("width", "560")
              iframeNode.setAttribute("height", "315")
              iframeNode.setAttribute("frameborder", "0")

              overlay.innerHTML = ""
              overlay.appendChild(iframeNode)
              overlay.classList.add("overlay--show")
            })

            link.removeAttribute("href")
            button.classList.add("review-item__video-button--enabled")
          })
}()
