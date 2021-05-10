import { Model } from 'objection';

export default class DeviceToken extends Model {
  id!: string;

  token!: string;
  deviceId!: string;

  // Table name is the only required property.
  static tableName = 'DeviceToken';

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: ['token', 'deviceId'],

    properties: {
      id: { type: 'string' },
      token: { type: 'string' },
      deviceId: { type: 'string' },
    },
  };
}
