import {
  describe,
  it,
  beforeAll,
  afterAll,
  expect,
  beforeEach,
  afterEach,
} from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  MongooseCollectionNamingPlugin,
  NamingConvention,
  toSnakeCase,
} from '../../dist/index.js';

describe('dist artifact smoke tests', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    mongoose.deleteModel(/.+/);
  });

  afterEach(async () => {
    const collections = await mongoose.connection
      .db!.listCollections()
      .toArray();

    for (const collection of collections) {
      await mongoose.connection.db!.dropCollection(collection.name);
    }
  });

  it('exports plugin, enum, and utility symbols from dist', () => {
    expect(typeof MongooseCollectionNamingPlugin).toBe('function');
    expect(NamingConvention.SnakeCase).toBe('SnakeCase');
    expect(toSnakeCase('BlogPost')).toBe('blog_post');
  });

  it('names collections in snake_case via built dist plugin', async () => {
    mongoose.plugin(MongooseCollectionNamingPlugin, {
      namingConvention: NamingConvention.SnakeCase,
    });

    const blogPostSchema = new mongoose.Schema({ title: String });
    const BlogPost = mongoose.model('BlogPost', blogPostSchema);

    await BlogPost.create({ title: 'test' });

    const collections = await mongoose.connection
      .db!.listCollections()
      .toArray();
    const collectionNames = collections.map((col) => col.name);

    expect(collectionNames).toContain('blog_posts');
  });
});
