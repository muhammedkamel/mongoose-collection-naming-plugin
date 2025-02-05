import { describe, it, expect } from 'vitest';
import {
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toPascalCase,
} from '../lib/string.util';

describe('String Utils', () => {
  it('should convert to camelCase', () => {
    expect(toCamelCase('hello_world')).toBe('helloWorld');
    expect(toCamelCase('hello-world')).toBe('helloWorld');
    expect(toCamelCase('HelloWorld')).toBe('helloWorld');
  });

  it('should convert to snake_case', () => {
    expect(toSnakeCase('helloWorld')).toBe('hello_world');
    expect(toSnakeCase('hello-world')).toBe('hello_world');

    expect(toSnakeCase('HelloWorld')).toBe('hello_world');
  });

  it('should convert to kebab-case', () => {
    expect(toKebabCase('helloWorld')).toBe('hello-world');
    expect(toKebabCase('hello_world')).toBe('hello-world');
    expect(toKebabCase('HelloWorld')).toBe('hello-world');
  });

  it('should convert to PascalCase', () => {
    expect(toPascalCase('hello_world')).toBe('HelloWorld');
    expect(toPascalCase('hello-world')).toBe('HelloWorld');
    expect(toPascalCase('helloWorld')).toBe('HelloWorld');
  });

  it('should handle empty input for camelCase', () => {
    expect(toCamelCase('')).toBe('');
  });

  it('should handle empty input for snake_case', () => {
    expect(toSnakeCase('')).toBe('');
  });

  it('should handle empty input for kebab-case', () => {
    expect(toKebabCase('')).toBe('');
  });

  it('should handle empty input for PascalCase', () => {
    expect(toPascalCase('')).toBe('');
  });

  it('should handle undefined input for camelCase', () => {
    expect(toCamelCase()).toBe('');
  });

  it('should handle undefined input for snake_case', () => {
    expect(toSnakeCase()).toBe('');
  });

  it('should handle undefined input for kebab-case', () => {
    expect(toKebabCase()).toBe('');
  });

  it('should handle undefined input for PascalCase', () => {
    expect(toPascalCase()).toBe('');
  });
});
