import { z } from 'zod';
import type { configSchema } from './zod';

export enum Status {
  LOADING,
  FIRST_LAUNCH,
  LOADED,
  INVALID_TOKEN,
}

export interface AppState {
  status: Status;
  loading: boolean;
  message: string | null;
  // queue:
  firstLaunch: boolean;
}

export type AppConfig = z.infer<typeof configSchema>;
