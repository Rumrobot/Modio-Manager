import type { AppConfig } from '$lib/types';
import { configSchema } from '$lib/zod';
import { getContext } from 'svelte';

export type Errors = {
  [K in keyof AppConfig]: string[];
};

export type Data = Partial<AppConfig>;

export const isOptional = (key: keyof AppConfig) => {
  return !configSchema.shape[key].isOptional();
};

export const getConfigContext = () => {
  return {
    data: getContext('data') as Partial<AppConfig>,
    errors: getContext('errors') as Errors,
    name: getContext('name') as keyof AppConfig,
  };
};
