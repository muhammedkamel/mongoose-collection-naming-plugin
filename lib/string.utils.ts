export function toCamelCase(input: string): string {
    if (!input) return '';
    
    return input
        .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
        .replace(/^([A-Z])/, (match) => match.toLowerCase());
}

export function toSnakeCase(input: string): string {
    if (!input) return '';
    
    return input
        .replace(/([A-Z])/g, '_$1')
        .replace(/[-\s]+/g, '_')
        .replace(/^_/, '')
        .toLowerCase();
}

export function toKebabCase(input: string): string {
    if (!input) return '';
    
    return input
        .replace(/([A-Z])/g, '-$1')
        .replace(/[_\s]+/g, '-')
        .replace(/^-/, '')
        .toLowerCase();
}

export function toPascalCase(input: string): string {
    if (!input) return '';
    
    return input
        .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
        .replace(/^(.)/, (match) => match.toUpperCase());
}
