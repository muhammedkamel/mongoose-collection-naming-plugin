/**
 * Converts a string to camelCase format.
 *
 * @param input - The string to convert. Can be in PascalCase, snake_case, kebab-case, or any mixed format.
 * @returns The string converted to camelCase format. Returns empty string if input is empty or undefined.
 *
 * @example
 * ```typescript
 * toCamelCase('hello_world')     // returns 'helloWorld'
 * toCamelCase('hello-world')     // returns 'helloWorld'
 * toCamelCase('HelloWorld')      // returns 'helloWorld'
 * toCamelCase('hello__world')    // returns 'helloWorld'
 * toCamelCase('')                // returns ''
 * ```
 */
export function toCamelCase(input?: string): string {
  if (!input) return '';

  return input
    .replaceAll(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^([A-Z])/, (match) => match.toLowerCase());
}

/**
 * Converts a string to snake_case format.
 *
 * @param input - The string to convert. Can be in PascalCase, camelCase, kebab-case, or any mixed format.
 * @returns The string converted to snake_case format. Returns empty string if input is empty or undefined.
 *
 * @example
 * ```typescript
 * toSnakeCase('helloWorld')      // returns 'hello_world'
 * toSnakeCase('hello-world')     // returns 'hello_world'
 * toSnakeCase('HelloWorld')      // returns 'hello_world'
 * toSnakeCase('hello__world')    // returns 'hello_world'
 * toSnakeCase('')                // returns ''
 * ```
 */
export function toSnakeCase(input?: string): string {
  if (!input) return '';

  return input
    .replaceAll(/([A-Z])/g, '_$1')
    .replaceAll(/[-\s]+/g, '_')
    .replaceAll(/_+/g, '_')
    .replace(/^_/, '')
    .toLowerCase();
}

/**
 * Converts a string to kebab-case format.
 *
 * @param input - The string to convert. Can be in PascalCase, camelCase, snake_case, or any mixed format.
 * @returns The string converted to kebab-case format. Returns empty string if input is empty or undefined.
 *
 * @example
 * ```typescript
 * toKebabCase('helloWorld')      // returns 'hello-world'
 * toKebabCase('hello_world')     // returns 'hello-world'
 * toKebabCase('HelloWorld')      // returns 'hello-world'
 * toKebabCase('hello--world')    // returns 'hello-world'
 * toKebabCase('')                // returns ''
 * ```
 */
export function toKebabCase(input?: string): string {
  if (!input) return '';

  return input
    .replaceAll(/([A-Z])/g, '-$1')
    .replaceAll(/[_\s]+/g, '-')
    .replaceAll(/-+/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
}

/**
 * Converts a string to PascalCase format.
 *
 * @param input - The string to convert. Can be in camelCase, snake_case, kebab-case, or any mixed format.
 * @returns The string converted to PascalCase format. Returns empty string if input is empty or undefined.
 *
 * @example
 * ```typescript
 * toPascalCase('hello_world')    // returns 'HelloWorld'
 * toPascalCase('hello-world')    // returns 'HelloWorld'
 * toPascalCase('helloWorld')     // returns 'HelloWorld'
 * toPascalCase('hello__world')   // returns 'HelloWorld'
 * toPascalCase('')               // returns ''
 * ```
 */
export function toPascalCase(input?: string): string {
  if (!input) return '';

  return input
    .replaceAll(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^(.)/, (match) => match.toUpperCase());
}
