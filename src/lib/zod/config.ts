import { z } from 'zod';

export const configSchema = z.object({
  token: z.string().min(5, "Your Mod.io API token must be at least 5 characters long")
});
