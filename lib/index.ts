import mongoose from 'mongoose';
import pluralize from 'pluralize';
import {
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
} from './string.util';
export * from './string.util';

/**
 * Supported naming conventions for MongoDB collection names.
 *
 * @enum {string}
 */
export enum NamingConvention {
  /** camelCase format: userProfiles, blogPosts */
  CamelCase = 'CamelCase',
  /** snake_case format: user_profiles, blog_posts */
  SnakeCase = 'SnakeCase',
  /** kebab-case format: user-profiles, blog-posts */
  KebabCase = 'KebabCase',
  /** PascalCase format: UserProfiles, BlogPosts */
  PascalCase = 'PascalCase',
}

type CaseConverter = (input: string) => string;

/**
 * Returns the appropriate case converter function based on the naming convention.
 *
 * @param namingConvention - The desired naming convention. Defaults to CamelCase if not provided.
 * @returns A function that converts strings to the specified case format.
 * @internal
 */
function getCaseConverter(namingConvention?: NamingConvention): CaseConverter {
  switch (namingConvention) {
    case NamingConvention.SnakeCase:
      return toSnakeCase;

    case NamingConvention.KebabCase:
      return toKebabCase;

    case NamingConvention.PascalCase:
      return toPascalCase;

    case NamingConvention.CamelCase:

    // fall through
    default:
      return toCamelCase;
  }
}

/**
 * Creates a collection name converter function that pluralizes and converts names
 * according to the specified naming convention.
 *
 * @param options - Configuration options for the converter.
 * @param options.namingConvention - The naming convention to apply. Defaults to CamelCase.
 * @returns A function that takes a model name and returns the converted collection name.
 * @internal
 */
function convertCollectionName(options?: {
  namingConvention?: NamingConvention;
}): (collectionName: string) => string {
  return (collectionName: string): string => {
    const pluralizedCollectionName = pluralize(collectionName);

    return getCaseConverter(options?.namingConvention)(
      pluralizedCollectionName,
    );
  };
}

/**
 * A Mongoose plugin that automatically converts and standardizes MongoDB collection names
 * according to your preferred naming convention.
 *
 * This plugin should be applied globally at application startup, before defining any models.
 * It handles pluralization and case conversion, ensuring consistency across your entire
 * application's database schema.
 *
 * @param schema - The Mongoose schema instance. This parameter is required by Mongoose's
 *                 plugin signature but is not directly used by this plugin as it operates
 *                 at the global Mongoose level.
 * @param options - Configuration options for the plugin.
 * @param options.namingConvention - The naming convention to use for all collection names.
 *                                    Defaults to CamelCase if not specified.
 *
 * @example
 * ```typescript
 * // Apply globally with default camelCase convention
 * mongoose.plugin(MongooseCollectionNamingPlugin);
 *
 * const User = mongoose.model('User', userSchema);
 * // Collection name will be: "users"
 * ```
 *
 * @example
 * ```typescript
 * // Apply globally with snake_case convention
 * mongoose.plugin(MongooseCollectionNamingPlugin, {
 *   namingConvention: NamingConvention.SnakeCase,
 * });
 *
 * const BlogPost = mongoose.model('BlogPost', blogPostSchema);
 * // Collection name will be: "blog_posts"
 * ```
 *
 * @remarks
 * - This plugin is designed for global use only. Apply it once at startup.
 * - The entire application must use the same naming convention.
 * - If you explicitly set a collection name in your schema options, this plugin will not override it.
 * - The plugin uses the `pluralize` library for automatic pluralization of collection names.
 *
 * @see {@link NamingConvention} for available naming conventions
 */
export function MongooseCollectionNamingPlugin(
  schema: mongoose.Schema,
  options?: { namingConvention?: NamingConvention },
): void {
  mongoose.pluralize(convertCollectionName(options));
}
