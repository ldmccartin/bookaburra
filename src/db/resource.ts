import ogs from 'open-graph-scraper';
import { Resource } from './schema/schema';

import type { SuccessResult } from 'open-graph-scraper'

export interface resource {
  name: string;
  url: string;
  ogData?: SuccessResult['result']
}

export const save = async (name: string, url: string) => {
  const resource = new Resource({ name, url });
  await resource.save();
}

export const getAll = async () => {
  const resources = Resource.find().lean();
  const mappedResources: Array<resource> = [];
  for await (const resource of resources) {
    const { result } = await ogs({ url: resource.url});
    mappedResources.push({...resource, ogData: result})
  }
  return mappedResources;
}