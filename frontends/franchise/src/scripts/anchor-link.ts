
void function InitAnchor() {
  document.querySelectorAll('a[href^="#"]')
          .forEach( anchorNode => {
            const href = anchorNode instanceof HTMLAnchorElement && anchorNode.href || undefined
            if (!href) {
              return
            }

            const m = href.match(/#[a-z-_]+$/i)
            if (!m) {
              return
            }

            const targetNode = document.querySelector(m[0])
            if (!targetNode) {
              return
            }

            anchorNode.addEventListener("click", event => {
              event.preventDefault()
              event.stopPropagation()

              const top = 'offsetTop' in targetNode && targetNode['offsetTop'] || NaN
              if (Number.isNaN(top)){
                return
              }

              window.scrollTo({ top: top, left: 100, behavior: "smooth" })
            })
          })
}()