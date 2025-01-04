<h1 align="center"> Mongoose Collection Naming Plugin </h1>
<p align="center">
  <b >
  A Mongoose plugin that enforces a standard naming convention for all MongoDB collections.
  </b>
</p>

<br>

![CI](https://github.com/muhammedkamel/mongoose-collection-naming/actions/workflows/ci.yml/badge.svg)
![releases](https://github.com/muhammedkamel/mongoose-collection-naming-plugin/workflows/release-please/badge.svg)


## Description

A Mongoose plugin that enforces a standard naming convention (_e.g., CamelCase, SnakeCase_) for collections while allowing flexibility for custom names outside the convention.

## Installation

### npm

```sh

npm i mongoose-collection-naming-plugin

```

### pnpm

```sh

pnpm add mongoose-collection-naming-plugin

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

### Javascript

``` javascript
const {
  MongooseCollectionNamingPlugin,
  NamingConvention,
} = require('mongoose-collection-naming-plugin');

mongoose.plugin(
  MongooseCollectionNamingPlugin, 
  { namingConvention: NamingConvention.SnakeCase }
);

```
