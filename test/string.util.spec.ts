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
    expect(toCamelCase('UserProfile')).toBe('userProfile');
    expect(toCamelCase('BlogPost')).toBe('blogPost');
  });

  it('should convert to snake_case', () => {
    expect(toSnakeCase('helloWorld')).toBe('hello_world');
    expect(toSnakeCase('hello-world')).toBe('hello_world');
    expect(toSnakeCase('HelloWorld')).toBe('hello_world');
    expect(toSnakeCase('UserProfile')).toBe('user_profile');
    expect(toSnakeCase('BlogPost')).toBe('blog_post');
    expect(toSnakeCase('ProductCategory')).toBe('product_category');
    expect(toSnakeCase('OrderItem')).toBe('order_item');
  });

  it('should convert to kebab-case', () => {
    expect(toKebabCase('helloWorld')).toBe('hello-world');
    expect(toKebabCase('hello_world')).toBe('hello-world');
    expect(toKebabCase('HelloWorld')).toBe('hello-world');
    expect(toKebabCase('UserProfile')).toBe('user-profile');
    expect(toKebabCase('BlogPost')).toBe('blog-post');
  });

  it('should convert to PascalCase', () => {
    expect(toPascalCase('hello_world')).toBe('HelloWorld');
    expect(toPascalCase('hello-world')).toBe('HelloWorld');
    expect(toPascalCase('helloWorld')).toBe('HelloWorld');
    expect(toPascalCase('user_profile')).toBe('UserProfile');
    expect(toPascalCase('blog-post')).toBe('BlogPost');
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

  describe('Edge Cases - Consecutive Separators', () => {
    it('should normalize consecutive underscores in snake_case', () => {
      expect(toSnakeCase('hello__world')).toBe('hello_world');
      expect(toSnakeCase('hello___world')).toBe('hello_world');
      expect(toSnakeCase('hello____world')).toBe('hello_world');
      expect(toSnakeCase('user__profile__data')).toBe('user_profile_data');
    });

    it('should normalize consecutive hyphens in kebab-case', () => {
      expect(toKebabCase('hello--world')).toBe('hello-world');
      expect(toKebabCase('hello---world')).toBe('hello-world');
      expect(toKebabCase('hello----world')).toBe('hello-world');
      expect(toKebabCase('user--profile--data')).toBe('user-profile-data');
    });

    it('should handle consecutive underscores when converting to camelCase', () => {
      expect(toCamelCase('hello__world')).toBe('helloWorld');
      expect(toCamelCase('hello___world')).toBe('helloWorld');
      expect(toCamelCase('user__profile__data')).toBe('userProfileData');
    });

    it('should handle consecutive hyphens when converting to camelCase', () => {
      expect(toCamelCase('hello--world')).toBe('helloWorld');
      expect(toCamelCase('hello---world')).toBe('helloWorld');
      expect(toCamelCase('user--profile--data')).toBe('userProfileData');
    });

    it('should handle consecutive underscores when converting to PascalCase', () => {
      expect(toPascalCase('hello__world')).toBe('HelloWorld');
      expect(toPascalCase('hello___world')).toBe('HelloWorld');
      expect(toPascalCase('user__profile__data')).toBe('UserProfileData');
    });

    it('should handle consecutive hyphens when converting to PascalCase', () => {
      expect(toPascalCase('hello--world')).toBe('HelloWorld');
      expect(toPascalCase('hello---world')).toBe('HelloWorld');
      expect(toPascalCase('user--profile--data')).toBe('UserProfileData');
    });

    it('should handle mixed consecutive separators', () => {
      expect(toSnakeCase('hello--__world')).toBe('hello_world');
      expect(toKebabCase('hello__--world')).toBe('hello-world');
      expect(toCamelCase('hello--__--world')).toBe('helloWorld');
      expect(toPascalCase('hello__--__world')).toBe('HelloWorld');
    });
  });

  describe('Edge Cases - Mixed Formats', () => {
    it('should handle strings with multiple spaces', () => {
      expect(toCamelCase('hello  world')).toBe('helloWorld');
      expect(toSnakeCase('hello   world')).toBe('hello_world');
      expect(toKebabCase('hello    world')).toBe('hello-world');
      expect(toPascalCase('hello  world')).toBe('HelloWorld');
    });

    it('should handle complex mixed format strings', () => {
      expect(toCamelCase('Hello-World_Test')).toBe('helloWorldTest');
      expect(toSnakeCase('HelloWorld-Test')).toBe('hello_world_test');
      expect(toKebabCase('Hello_World-Test')).toBe('hello-world-test');
      expect(toPascalCase('hello-world_test')).toBe('HelloWorldTest');
    });

    it('should handle strings with leading/trailing separators', () => {
      expect(toSnakeCase('_helloWorld')).toBe('hello_world');
      expect(toKebabCase('-helloWorld')).toBe('hello-world');
    });
  });

  describe('Edge Cases - Single Character', () => {
    it('should handle single character inputs', () => {
      expect(toCamelCase('a')).toBe('a');
      expect(toSnakeCase('a')).toBe('a');
      expect(toKebabCase('a')).toBe('a');
      expect(toPascalCase('a')).toBe('A');
      expect(toCamelCase('A')).toBe('a');
      expect(toSnakeCase('A')).toBe('a');
      expect(toKebabCase('A')).toBe('a');
      expect(toPascalCase('A')).toBe('A');
    });
  });
});
