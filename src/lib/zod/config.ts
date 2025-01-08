import { z } from 'zod';

export const configSchema = z.object({
  token: z.string(),
});
