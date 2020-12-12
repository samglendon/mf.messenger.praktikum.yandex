export function render(from, query, block) {
  const root = from.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}
