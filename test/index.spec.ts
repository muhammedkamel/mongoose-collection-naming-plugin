import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseCollectionNamingPlugin, NamingConvention } from '../lib/index';

describe('MongooseCaseConverterPlugin', () => {
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

  it('should convert collection names to camelCase by default', async () => {
    const schema = new mongoose.Schema({ name: String });

    MongooseCollectionNamingPlugin(schema);

    const TestModel = mongoose.model('TestCollectionCamel', schema);

    await TestModel.create({ name: 'test' });

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((col) => col.name);

    expect(collectionNames).toContain('testCollectionCamels');
  });

  it('should convert collection names to snake_case', async () => {
    const schema = new mongoose.Schema({ name: String });

    MongooseCollectionNamingPlugin(schema, {
      namingConvention: NamingConvention.SnakeCase,
    });

    const TestModel = mongoose.model('testCollectionSnake', schema);

    await TestModel.create({ name: 'test' });

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((col) => col.name);

    expect(collectionNames).toContain('test_collection_snakes');
  });

  it('should convert collection names to kebab-case', async () => {
    const schema = new mongoose.Schema({ name: String });

    MongooseCollectionNamingPlugin(schema, {
      namingConvention: NamingConvention.KebabCase,
    });

    const TestModel = mongoose.model('test_collection_kebab', schema);

    await TestModel.create({ name: 'test' });

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((col) => col.name);

    expect(collectionNames).toContain('test-collection-kebabs');
  });

  it('should convert collection names to PascalCase', async () => {
    const schema = new mongoose.Schema({ name: String });

    MongooseCollectionNamingPlugin(schema, {
      namingConvention: NamingConvention.PascalCase,
    });

    const TestModel = mongoose.model('test_collection-pascal', schema);

    await TestModel.create({ name: 'test' });

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((col) => col.name);

    expect(collectionNames).toContain('TestCollectionPascals');
  });
});
