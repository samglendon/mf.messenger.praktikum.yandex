export function render(from, query, block, method = 'append') {
  const root = from.querySelector(query);
  if (method === 'append') root.appendChild(block.getContent());
  if (method === 'after') root.after(block.getContent());
  return root;
}
