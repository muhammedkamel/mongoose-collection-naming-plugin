<h1 align="center"> Mongoose Collection Naming Plugin </h1>
<p align="center">
  <b >
  A Mongoose plugin that enforces a standard naming convention for all MongoDB collections.
  </b>
</p>

<br>

![CI](https://github.com/muhammedkamel/mongoose-collection-naming-plugin/actions/workflows/ci.yml/badge.svg)
![release](https://github.com/muhammedkamel/mongoose-collection-naming-plugin/workflows/release/badge.svg)
[![npm version](https://badge.fury.io/js/mongoose-collection-naming-plugin.svg)](https://badge.fury.io/js/mongoose-collection-naming-plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A Mongoose plugin that automatically converts and standardizes MongoDB collection names according to your preferred naming convention. It handles pluralization and case conversion, ensuring consistency across your entire application's database schema.

**Features:**

- 🎯 Automatic collection name conversion to your chosen convention
- 📦 Built-in pluralization support
- 🔧 Four naming conventions supported: camelCase, snake_case, kebab-case, PascalCase
- 🌍 Global configuration for consistent naming across all models
- 📘 Full TypeScript support with type definitions
- ⚡ Zero configuration - works out of the box with sensible defaults
- 🔒 Simple and predictable - one convention for entire application
- 🔄 Dual module support - works with both CommonJS and ES modules

## Installation

### npm

```sh
npm install mongoose-collection-naming-plugin
```

### yarn

```sh
yarn add mongoose-collection-naming-plugin
```

### pnpm

```sh
pnpm add mongoose-collection-naming-plugin
```

## Quick Start

> **💡 Tip**: Apply this plugin **once** at application startup, before defining any models.

### TypeScript

```typescript
import mongoose from 'mongoose';
import { MongooseCollectionNamingPlugin, NamingConvention } from 'mongoose-collection-naming-plugin';

// Step 1: Apply plugin globally at startup (uses camelCase by default)
mongoose.plugin(MongooseCollectionNamingPlugin);

// Step 2: Create your models as usual
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);
// Collection name will be: "users" (camelCase by default)
```

### JavaScript

```javascript
const mongoose = require('mongoose');
const { MongooseCollectionNamingPlugin, NamingConvention } = require('mongoose-collection-naming-plugin');

// Step 1: Apply plugin globally with custom convention
mongoose.plugin(MongooseCollectionNamingPlugin, {
  namingConvention: NamingConvention.SnakeCase,
});

// Step 2: Create your models as usual
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);
// Collection name will be: "users" (snake_case)
```

## Naming Conventions

The plugin supports four naming conventions:

### 1. CamelCase (Default)

```typescript
mongoose.plugin(MongooseCollectionNamingPlugin, {
  namingConvention: NamingConvention.CamelCase,
});
```

**Examples:**

- `User` → `users`
- `BlogPost` → `blogPosts`
- `UserProfile` → `userProfiles`
- `product_category` → `productCategories`

### 2. SnakeCase

```typescript
mongoose.plugin(MongooseCollectionNamingPlugin, {
  namingConvention: NamingConvention.SnakeCase,
});
```

**Examples:**

- `User` → `users`
- `BlogPost` → `blog_posts`
- `UserProfile` → `user_profiles`
- `productCategory` → `product_categories`
- `API-Key` → `api_keys`

### 3. KebabCase

```typescript
mongoose.plugin(MongooseCollectionNamingPlugin, {
  namingConvention: NamingConvention.KebabCase,
});
```

**Examples:**

- `User` → `users`
- `BlogPost` → `blog-posts`
- `UserProfile` → `user-profiles`
- `productCategory` → `product-categories`

### 4. PascalCase

```typescript
mongoose.plugin(MongooseCollectionNamingPlugin, {
  namingConvention: NamingConvention.PascalCase,
});
```

**Examples:**

- `User` → `Users`
- `blogPost` → `BlogPosts`
- `user_profile` → `UserProfiles`
- `product-category` → `ProductCategories`

## Usage

> **⚠️ Important**: This plugin is designed for **global use only**. It should be applied once at application startup, not per-schema.

### Correct Usage (Global Plugin)

Apply the plugin globally to affect all schemas in your application:

```typescript
import mongoose from 'mongoose';
import { MongooseCollectionNamingPlugin, NamingConvention } from 'mongoose-collection-naming-plugin';

// Configure once at application startup - BEFORE defining any models
mongoose.plugin(MongooseCollectionNamingPlugin, {
  namingConvention: NamingConvention.SnakeCase,
});

// All models will now automatically use snake_case
const User = mongoose.model('User', userSchema); // → users
const BlogPost = mongoose.model('BlogPost', blogSchema); // → blog_posts
const Comment = mongoose.model('Comment', commentSchema); // → comments
```

### ❌ Incorrect Usage

**Do NOT apply the plugin per-schema with different conventions:**

```typescript
// ❌ WRONG - Don't do this!
userSchema.plugin(MongooseCollectionNamingPlugin, {
  namingConvention: NamingConvention.CamelCase,
});

productSchema.plugin(MongooseCollectionNamingPlugin, {
  namingConvention: NamingConvention.SnakeCase,
});

// This will cause issues - the last applied convention affects ALL models globally
```

## API Reference

### `MongooseCollectionNamingPlugin`

The main plugin function.

**Type Signature:**

```typescript
function MongooseCollectionNamingPlugin(schema: mongoose.Schema, options?: { namingConvention?: NamingConvention }): void;
```

**Parameters:**

- `schema` (mongoose.Schema) - The Mongoose schema to apply the plugin to
- `options` (Object, optional) - Configuration options
  - `namingConvention` (NamingConvention, optional) - The naming convention to use. Defaults to `NamingConvention.CamelCase`

### `NamingConvention` Enum

Available naming conventions:

```typescript
enum NamingConvention {
  CamelCase = 'CamelCase', // userProfiles
  SnakeCase = 'SnakeCase', // user_profiles
  KebabCase = 'KebabCase', // user-profiles
  PascalCase = 'PascalCase', // UserProfiles
}
```

### Utility Functions

The plugin also exports utility functions for case conversion that you can use independently:

#### `toCamelCase(input?: string): string`

Converts a string to camelCase format.

```typescript
import { toCamelCase } from 'mongoose-collection-naming-plugin';

toCamelCase('user_profile');      // returns 'userProfile'
toCamelCase('blog-post');         // returns 'blogPost'
toCamelCase('ProductCategory');   // returns 'productCategory'
```

#### `toSnakeCase(input?: string): string`

Converts a string to snake_case format.

```typescript
import { toSnakeCase } from 'mongoose-collection-naming-plugin';

toSnakeCase('userProfile');       // returns 'user_profile'
toSnakeCase('blog-post');         // returns 'blog_post'
toSnakeCase('ProductCategory');   // returns 'product_category'
```

#### `toKebabCase(input?: string): string`

Converts a string to kebab-case format.

```typescript
import { toKebabCase } from 'mongoose-collection-naming-plugin';

toKebabCase('userProfile');       // returns 'user-profile'
toKebabCase('product_category');  // returns 'product-category'
toKebabCase('BlogPost');          // returns 'blog-post'
```

#### `toPascalCase(input?: string): string`

Converts a string to PascalCase format.

```typescript
import { toPascalCase } from 'mongoose-collection-naming-plugin';

toPascalCase('user_profile');     // returns 'UserProfile'
toPascalCase('blog-post');        // returns 'BlogPost'
toPascalCase('productCategory');  // returns 'ProductCategory'
```

## Advanced Examples

### Mixed Input Formats

The plugin handles various input formats correctly:

```typescript
mongoose.plugin(MongooseCollectionNamingPlugin, {
  namingConvention: NamingConvention.SnakeCase,
});

// All of these convert correctly to snake_case:
mongoose.model('UserProfile', schema); // → user_profiles
mongoose.model('user-profile', schema); // → user_profiles
mongoose.model('user_profile', schema); // → user_profiles
mongoose.model('userProfile', schema); // → user_profiles
```

### With Mongoose Connection

```typescript
import mongoose from 'mongoose';
import { MongooseCollectionNamingPlugin, NamingConvention } from 'mongoose-collection-naming-plugin';

async function connectDB() {
  // Apply plugin before connecting
  mongoose.plugin(MongooseCollectionNamingPlugin, {
    namingConvention: NamingConvention.SnakeCase,
  });

  await mongoose.connect('mongodb://localhost:27017/myapp');

  console.log('Connected to MongoDB with snake_case collections');
}
```

### Real-World Application Structure

```typescript
// src/config/database.ts
import mongoose from 'mongoose';
import { MongooseCollectionNamingPlugin, NamingConvention } from 'mongoose-collection-naming-plugin';

export function setupDatabase() {
  // Configure naming convention for all models
  mongoose.plugin(MongooseCollectionNamingPlugin, {
    namingConvention: NamingConvention.SnakeCase,
  });

  // Other global plugins...
}

// src/models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);
// Collection: "users"

// src/models/BlogPost.ts
import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: mongoose.Schema.Types.ObjectId,
});

export const BlogPost = mongoose.model('BlogPost', blogPostSchema);
// Collection: "blog_posts"
```

## Important Notes

### ⚠️ Global Behavior

**This plugin is designed for global use only.**

1. **Apply Once at Startup**: The plugin should be applied **only once** at application startup, before defining any models:

   ```typescript
   // ✅ CORRECT - Apply once globally at startup
   import mongoose from 'mongoose';
   import { MongooseCollectionNamingPlugin, NamingConvention } from 'mongoose-collection-naming-plugin';

   mongoose.plugin(MongooseCollectionNamingPlugin, {
     namingConvention: NamingConvention.SnakeCase,
   });

   // Then define all your models - they automatically use snake_case
   ```

2. **Single Convention Per Application**: The entire application must use the same naming convention. Mixed conventions are not supported:

   ```typescript
   // ❌ WRONG - Don't apply multiple times with different conventions!
   mongoose.plugin(MongooseCollectionNamingPlugin, {
     namingConvention: NamingConvention.CamelCase,
   });

   // Later in your code...
   mongoose.plugin(MongooseCollectionNamingPlugin, {
     namingConvention: NamingConvention.SnakeCase, // This overwrites the first one!
   });
   // ALL models will now use snake_case, not just new ones
   ```

3. **Per-Schema Usage Not Supported**: Do not apply this plugin to individual schemas with different conventions, as it affects the global Mongoose configuration.

### 📚 Pluralization

The plugin uses the [pluralize](https://www.npmjs.com/package/pluralize) library for automatic pluralization:

- `User` → `users`
- `Person` → `people` (irregular plural)
- `Mouse` → `mice` (irregular plural)
- `Category` → `categories`

### 🎯 Explicit Collection Names

If you explicitly set a collection name in your schema, this plugin will **not** override it:

```typescript
const userSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    collection: 'my_custom_users', // This will NOT be changed by the plugin
  },
);
```

## 🔄 Migration Guide

If you're adding this plugin to an existing application:

### Step 1: Apply the Plugin

```typescript
mongoose.plugin(MongooseCollectionNamingPlugin, {
  namingConvention: NamingConvention.SnakeCase,
});
```

### Step 2: Rename Existing Collections

```typescript
// Example migration script
async function migrateCollections() {
  const db = mongoose.connection.db;

  await db.collection('users').rename('users'); // Already correct
  await db.collection('blogposts').rename('blog_posts');
  await db.collection('userprofiles').rename('user_profiles');

  console.log('Collections renamed successfully');
}
```

## 🔧 Troubleshooting

### Collections not being renamed

**Problem**: Models are still using old collection names.

**Solution**: Ensure the plugin is applied **before** calling `mongoose.model()`:

```typescript
// ✅ Correct order
mongoose.plugin(MongooseCollectionNamingPlugin);
const User = mongoose.model('User', userSchema);

// ❌ Wrong order
const User = mongoose.model('User', userSchema);
mongoose.plugin(MongooseCollectionNamingPlugin); // Too late!
```

### Mixed naming conventions not working

**Problem**: Trying to use different conventions for different models doesn't work.

**Solution**: This is by design. The plugin is **global only** and supports a single naming convention per application. Choose one convention and apply it once at startup:

```typescript
// ✅ Correct - one convention for entire app
mongoose.plugin(MongooseCollectionNamingPlugin, {
  namingConvention: NamingConvention.SnakeCase,
});
```

If you need different conventions for different models, you must explicitly set collection names:

```typescript
// For models that need different naming
const specialSchema = new mongoose.Schema(
  { name: String },
  { collection: 'SpecialCollectionName' }, // Explicit override
);
```

## 📋 Requirements

- Node.js >= 22.x (CI verifies Node.js 22 and 24 LTS)
- Mongoose >= 6.x

## 🔄 Module System Support

This package supports both CommonJS and ES modules out of the box:

### ES Modules (ESM)

```typescript
import mongoose from 'mongoose';
import { MongooseCollectionNamingPlugin, NamingConvention } from 'mongoose-collection-naming-plugin';
```

### CommonJS (CJS)

```javascript
const mongoose = require('mongoose');
const { MongooseCollectionNamingPlugin, NamingConvention } = require('mongoose-collection-naming-plugin');
```

The package automatically provides the correct module format based on your project configuration.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

This project exists thanks to all the people who contribute:

<a href="https://github.com/muhammedkamel/mongoose-collection-naming-plugin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=muhammedkamel/mongoose-collection-naming-plugin" alt="Contributors" />
</a>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

If you have any questions or issues, please open an issue on [GitHub](https://github.com/muhammedkamel/mongoose-collection-naming-plugin/issues).

---

<p align="center">Made with ❤️ by Mohamed Kamel</p>
