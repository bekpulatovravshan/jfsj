export function sliceStr(str) {
  return str.substring(0, 30).concat('...');
}

export function generateId() {
  return Math.floor(Math.random() * (1000000 - 1) + 1);
}
