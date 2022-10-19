export const createElement = (target: keyof HTMLElementTagNameMap) => {
  const el = document.createElement(target);
  return el;
};
