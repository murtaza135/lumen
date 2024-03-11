export function objectMap<V, T>(obj: Record<string, V>, fn: (value: V) => T) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value)])
  );
}