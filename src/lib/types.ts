import { z } from 'zod';
import type { configSchema } from './zod';

export interface AppState {
  status: string;
  loading: boolean;
  message: string | null;
  // queue:
  firstLaunch: boolean;
}

export type AppConfig = z.infer<typeof configSchema>;
