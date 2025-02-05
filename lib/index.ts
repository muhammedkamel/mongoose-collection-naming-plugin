import mongoose from 'mongoose';
import pluralize from 'pluralize';
import {
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
} from './string.util';

export enum NamingConvention {
  CamelCase = 'CamelCase',
  SnakeCase = 'SnakeCase',
  KebabCase = 'KebabCase',
  PascalCase = 'PascalCase',
}

type CaseConverter = (input: string) => string;

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

export function MongooseCollectionNamingPlugin(
  schema: mongoose.Schema,
  options?: { namingConvention?: NamingConvention },
): void {
  mongoose.pluralize(convertCollectionName(options));
}
