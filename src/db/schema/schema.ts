import * as mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    url: {type: String, required: true},
  }
);

export type Resource = mongoose.InferSchemaType<typeof resourceSchema>;
export const Resource = mongoose.model('Resource', resourceSchema);