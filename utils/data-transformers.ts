export function toCamelCase<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase) as unknown as T;
  }

  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [
        k.replace(/_([a-z])/g, (_, l) => l.toUpperCase()),
        toCamelCase(v),
      ])
    ) as T;
  }

  return obj as T;
}

export function toSnakeCase<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase) as unknown as T;
  }

  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [
        k.replace(/([A-Z])/g, "_$1").toLowerCase(),
        toSnakeCase(v),
      ])
    ) as T;
  }

  return obj as T;
}
