
import mongoose from "mongoose";
import * as pluralize from "pluralize";
import { NamingConvention } from "./naming-convention.enum";
import { toCamelCase, toKebabCase, toPascalCase, toSnakeCase } from "./string.utils";

type CaseConverter = (input: string) => string;

function getCaseConverter(namingConvention?: NamingConvention):CaseConverter {
    switch (namingConvention) {
        case NamingConvention.CamelCase:
            return toCamelCase
        case NamingConvention.SnakeCase:
            return toSnakeCase
        case NamingConvention.KebabCase:
            return toKebabCase
        case NamingConvention.PascalCase:
            return toPascalCase
        default:
            return toCamelCase
    }
}

function convertCollectionName(collectionName: string): string {
    const pluralizedCollectionName = pluralize(collectionName);

    return getCaseConverter(this?.namingConvention)(pluralizedCollectionName);
}

export function MongooseCaseConverterPlugin(schema: mongoose.Schema, options?: { namingConvention?: NamingConvention }) {
    mongoose.pluralize(convertCollectionName.bind(options));
}