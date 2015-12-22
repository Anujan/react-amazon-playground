export default function stripHtml(html) {
  var el = document.createElement('DIV');
  el.innerHTML = html;
  return el.textContent || el.innerText || '';
}
