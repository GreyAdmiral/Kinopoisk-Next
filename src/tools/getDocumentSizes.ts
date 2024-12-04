export function getDocumentWidth() {
   return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.scrollWidth,
      document.documentElement.scrollWidth
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
