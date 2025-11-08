export function toCamelCase(input?: string): string {
  if (!input) return '';

  return input
    .replaceAll(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^([A-Z])/, (match) => match.toLowerCase());
}

export function toSnakeCase(input?: string): string {
  if (!input) return '';

  return input
    .replaceAll(/([A-Z])/g, '_$1')
    .replaceAll(/[-\s]+/g, '_')
    .replace(/^_/, '')
    .toLowerCase();
}

export function toKebabCase(input?: string): string {
  if (!input) return '';

  return input
    .replaceAll(/([A-Z])/g, '-$1')
    .replaceAll(/[_\s]+/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
}

export function toPascalCase(input?: string): string {
  if (!input) return '';

  return input
    .replaceAll(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^(.)/, (match) => match.toUpperCase());
}
