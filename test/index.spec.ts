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
import { MongooseCollectionNamingPlugin, NamingConvention } from '../lib/index';

describe('MongooseCollectionNamingPlugin', () => {
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
    // Clear all models before each test to avoid conflicts
    mongoose.deleteModel(/.+/);
  });

  afterEach(async () => {
    // Clean up collections after each test
    const collections = await mongoose.connection
      .db!.listCollections()
      .toArray();

    for (const collection of collections) {
      await mongoose.connection.db!.dropCollection(collection.name);
    }
  });

  describe('Global Plugin Usage', () => {
    it('should convert all collection names to camelCase by default', async () => {
      // Apply plugin globally (recommended usage)
      mongoose.plugin(MongooseCollectionNamingPlugin);

      // Create multiple models
      const userSchema = new mongoose.Schema({ name: String });
      const blogPostSchema = new mongoose.Schema({ title: String });
      const userProfileSchema = new mongoose.Schema({ bio: String });

      const User = mongoose.model('User', userSchema);
      const BlogPost = mongoose.model('BlogPost', blogPostSchema);
      const UserProfile = mongoose.model('UserProfile', userProfileSchema);

      // Create documents to ensure collections are created
      await User.create({ name: 'test' });
      await BlogPost.create({ title: 'test' });
      await UserProfile.create({ bio: 'test' });

      const collections = await mongoose.connection
        .db!.listCollections()
        .toArray();
      const collectionNames = collections.map((col) => col.name);

      expect(collectionNames).toContain('users');
      expect(collectionNames).toContain('blogPosts');
      expect(collectionNames).toContain('userProfiles');
    });

    it('should convert all collection names to snake_case', async () => {
      // Apply plugin globally with snake_case
      mongoose.plugin(MongooseCollectionNamingPlugin, {
        namingConvention: NamingConvention.SnakeCase,
      });

      // Create multiple models
      const userSchema = new mongoose.Schema({ name: String });
      const blogPostSchema = new mongoose.Schema({ title: String });
      const userProfileSchema = new mongoose.Schema({ bio: String });

      const User = mongoose.model('User', userSchema);
      const BlogPost = mongoose.model('BlogPost', blogPostSchema);
      const UserProfile = mongoose.model('UserProfile', userProfileSchema);

      // Create documents
      await User.create({ name: 'test' });
      await BlogPost.create({ title: 'test' });
      await UserProfile.create({ bio: 'test' });

      const collections = await mongoose.connection
        .db!.listCollections()
        .toArray();
      const collectionNames = collections.map((col) => col.name);

      expect(collectionNames).toContain('users');
      expect(collectionNames).toContain('blog_posts');
      expect(collectionNames).toContain('user_profiles');
    });

    it('should convert all collection names to kebab-case', async () => {
      // Apply plugin globally with kebab-case
      mongoose.plugin(MongooseCollectionNamingPlugin, {
        namingConvention: NamingConvention.KebabCase,
      });

      // Create multiple models
      const userSchema = new mongoose.Schema({ name: String });
      const blogPostSchema = new mongoose.Schema({ title: String });
      const userProfileSchema = new mongoose.Schema({ bio: String });

      const User = mongoose.model('User', userSchema);
      const BlogPost = mongoose.model('BlogPost', blogPostSchema);
      const UserProfile = mongoose.model('UserProfile', userProfileSchema);

      // Create documents
      await User.create({ name: 'test' });
      await BlogPost.create({ title: 'test' });
      await UserProfile.create({ bio: 'test' });

      const collections = await mongoose.connection
        .db!.listCollections()
        .toArray();
      const collectionNames = collections.map((col) => col.name);

      expect(collectionNames).toContain('users');
      expect(collectionNames).toContain('blog-posts');
      expect(collectionNames).toContain('user-profiles');
    });

    it('should convert all collection names to PascalCase', async () => {
      // Apply plugin globally with PascalCase
      mongoose.plugin(MongooseCollectionNamingPlugin, {
        namingConvention: NamingConvention.PascalCase,
      });

      // Create multiple models
      const userSchema = new mongoose.Schema({ name: String });
      const blogPostSchema = new mongoose.Schema({ title: String });
      const userProfileSchema = new mongoose.Schema({ bio: String });

      const User = mongoose.model('User', userSchema);
      const BlogPost = mongoose.model('BlogPost', blogPostSchema);
      const UserProfile = mongoose.model('UserProfile', userProfileSchema);

      // Create documents
      await User.create({ name: 'test' });
      await BlogPost.create({ title: 'test' });
      await UserProfile.create({ bio: 'test' });

      const collections = await mongoose.connection
        .db!.listCollections()
        .toArray();
      const collectionNames = collections.map((col) => col.name);

      expect(collectionNames).toContain('Users');
      expect(collectionNames).toContain('BlogPosts');
      expect(collectionNames).toContain('UserProfiles');
    });
  });

  describe('Mixed Input Formats', () => {
    it('should handle various input formats correctly with snake_case', async () => {
      mongoose.plugin(MongooseCollectionNamingPlugin, {
        namingConvention: NamingConvention.SnakeCase,
      });

      // Various input formats
      const schema1 = new mongoose.Schema({ name: String });
      const schema2 = new mongoose.Schema({ name: String });
      const schema3 = new mongoose.Schema({ name: String });
      const schema4 = new mongoose.Schema({ name: String });

      const Model1 = mongoose.model('UserProfile', schema1); // PascalCase
      const Model2 = mongoose.model('user-profile', schema2); // kebab-case
      const Model3 = mongoose.model('user_profile_test', schema3); // snake_case
      const Model4 = mongoose.model('userProfileData', schema4); // camelCase

      // Create documents
      await Model1.create({ name: 'test1' });
      await Model2.create({ name: 'test2' });
      await Model3.create({ name: 'test3' });
      await Model4.create({ name: 'test4' });

      const collections = await mongoose.connection
        .db!.listCollections()
        .toArray();
      const collectionNames = collections.map((col) => col.name);

      // All should be converted to snake_case and pluralized
      expect(collectionNames).toContain('user_profiles');
      expect(collectionNames).toContain('user_profile_tests');
      expect(collectionNames).toContain('user_profile_data');
    });
  });

  describe('Explicit Collection Names', () => {
    it('should not override explicit collection names', async () => {
      mongoose.plugin(MongooseCollectionNamingPlugin, {
        namingConvention: NamingConvention.SnakeCase,
      });

      // Schema with explicit collection name
      const userSchema = new mongoose.Schema(
        { name: String },
        {
          collection: 'my_custom_users', // Explicit name
        },
      );

      const User = mongoose.model('User', userSchema);

      await User.create({ name: 'test' });

      const collections = await mongoose.connection
        .db!.listCollections()
        .toArray();
      const collectionNames = collections.map((col) => col.name);

      // Should keep the explicit name, not convert to 'users'
      expect(collectionNames).toContain('my_custom_users');
      expect(collectionNames).not.toContain('users');
    });
  });

  describe('Pluralization', () => {
    it('should handle irregular plurals correctly', async () => {
      mongoose.plugin(MongooseCollectionNamingPlugin, {
        namingConvention: NamingConvention.SnakeCase,
      });

      const personSchema = new mongoose.Schema({ name: String });
      const mouseSchema = new mongoose.Schema({ name: String });
      const childSchema = new mongoose.Schema({ name: String });

      const Person = mongoose.model('Person', personSchema);
      const Mouse = mongoose.model('Mouse', mouseSchema);
      const Child = mongoose.model('Child', childSchema);

      await Person.create({ name: 'test' });
      await Mouse.create({ name: 'test' });
      await Child.create({ name: 'test' });

      const collections = await mongoose.connection
        .db!.listCollections()
        .toArray();
      const collectionNames = collections.map((col) => col.name);

      // Should handle irregular plurals
      expect(collectionNames).toContain('people');
      expect(collectionNames).toContain('mice');
      expect(collectionNames).toContain('children');
    });
  });

  describe('Global State Behavior', () => {
    it('should use the last applied convention for all models', async () => {
      // First, apply camelCase
      mongoose.plugin(MongooseCollectionNamingPlugin, {
        namingConvention: NamingConvention.CamelCase,
      });

      // Then override with snake_case (global behavior)
      mongoose.plugin(MongooseCollectionNamingPlugin, {
        namingConvention: NamingConvention.SnakeCase,
      });

      // Create models after both applications
      const userSchema = new mongoose.Schema({ name: String });
      const postSchema = new mongoose.Schema({ title: String });

      const User = mongoose.model('User', userSchema);
      const BlogPost = mongoose.model('BlogPost', postSchema);

      await User.create({ name: 'test' });
      await BlogPost.create({ title: 'test' });

      const collections = await mongoose.connection
        .db!.listCollections()
        .toArray();
      const collectionNames = collections.map((col) => col.name);

      // Both should use snake_case (the last applied convention)
      expect(collectionNames).toContain('users');
      expect(collectionNames).toContain('blog_posts');
      expect(collectionNames).not.toContain('blogPosts');
    });
  });
});
