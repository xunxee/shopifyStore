export function get({ page, key }) {
  return (obj) => obj[page][key];
}

export function TODO() {
  return 'TODO';
}
