void function FBInit(window, n) {
  if (window.fbq) {
    return
  }

  n = window.fbq = function() {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
  }

  if (!window._fbq) {
    window._fbq = n
  }

  n.push = n
  n.loaded = true
  n.version = "2.0"
  n.queue = []



  const script = document.createElement("script")
  script.type = "text/javascript"
  script.async = true
  script.src = "https://connect.facebook.net/ru_RU/fbevents.js"
  document.head.appendChild(script)

  window.fbq("init", "731086577248250")
  window.fbq("track", "PageView")
}(window as any, undefined as any)


// <script>
// !function(f,b,e,v,n,t,s) {
//   if(f.fbq) return;

//   n = f.fbq = function(){
//     n.callMethod? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
//   };

//   if(!f._fbq) f._fbq = n;
//   n.push = n;
//   n.loaded=!0;
//   n.version='2.0';
//   n.queue=[];
//   t=b.createElement(e);
//   t.async=!0;
//   t.src=v;s=b.getElementsByTagName(e)[0];
//   s.parentNode.insertBefore(t,s)
// }( window, document,'script', '');
// fbq('init', '731086577248250');
//

// </script>
// <noscript>
// <img height="1" width="1"
// src="https://www.facebook.com/tr?id=731086577248250&ev=PageView
// &noscript=1"/>
// </noscript>