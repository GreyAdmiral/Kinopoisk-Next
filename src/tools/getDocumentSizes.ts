export function getDocumentWidth() {
   return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth
   );
}

export function getDocumentHeight() {
   return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
   );
}
