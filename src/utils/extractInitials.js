export function extractInitials(name) {
  const splitName = name.split(' ');
  if (splitName.length === 0) return '';

  const firstInitial = splitName[0].charAt(0).toUpperCase();
  if (splitName.length === 1) return firstInitial;

  const lastInitial = splitName[splitName.length - 1].charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
}
