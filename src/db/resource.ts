import { Resource } from './schema/schema';

export const save = async (name: string, url: string) => {
  const resource = new Resource({ name, url });
  await resource.save();
}

export const getAll = async () => {
 return Resource.find().lean();
}