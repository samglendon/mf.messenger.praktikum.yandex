export function render(from: HTMLElement, query: string, block: HTMLElement, method = 'append') {
  const root = from.querySelector(query);
  if (root) {
    if (method === 'append') root.appendChild(block);
    if (method === 'after') root.after(block);
  }
  return root;
}
