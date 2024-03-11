export function objectFilter<V>(obj: Record<string, V>, fn: (value: V) => boolean) {
  return Object.fromEntries(
    Object.entries(obj).filter((([_, value]) => fn(value)))
  );
}