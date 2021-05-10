import { Model } from 'objection';

export default class Article extends Model {
  id!: string;

  title!: string;
  content!: string;
  shortContent!: string;

  cover?: string;

  // Table name is the only required property.
  static tableName = 'Article';

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: ['title', 'content', 'shortContent'],

    properties: {
      id: { type: 'string' },
      title: { type: 'string', minLength: 1, maxLength: 512 },
      shortContent: { type: 'string', minLength: 1, maxLength: 512 },
      content: { type: 'string' },
    },
  };
}
