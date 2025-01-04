# Mongoose Collection Naming Plugin

A Mongoose plugin that enforces a standard naming convention (_e.g., CamelCase, SnakeCase_) for collections while allowing flexibility for custom names outside the convention.

## Install

```sh

npm i mongoose-collection-naming-plugin

```

## Usage

### Typescript

```ts
import {
  MongooseCollectionNamingPlugin,
  NamingConvention,
} from 'mongoose-collection-naming-plugin';

mongoose.plugin(
  MongooseCollectionNamingPlugin, 
  { namingConvention: NamingConvention.CamelCase }
);

```

``` javascript
const {
  MongooseCollectionNamingPlugin,
  NamingConvention,
} = require("mongoose-collection-naming-plugin");

mongoose.plugin(
  MongooseCollectionNamingPlugin, 
  { namingConvention: NamingConvention.SnakeCase }
);

```
