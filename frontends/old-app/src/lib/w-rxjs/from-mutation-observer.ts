import { Observable } from "rxjs"

export function fromMutationObserver(target: Node, options: MutationObserverInit) {
  return new Observable<MutationRecord>(function(observer) {
    const mutationObserver = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => observer.next(mutation))
    })
    mutationObserver.observe(target, options)
    return function() {
      mutationObserver.disconnect()
    }
  })
}


