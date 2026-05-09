export default function capitalize(str) {
  if (!str) return "";
  const firstLetter = str[0].toUpperCase();
  const rest = str.slice(1);
  return firstLetter + rest;
}
