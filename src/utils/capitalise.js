export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitaliseWords(string) {
  return string.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
}
