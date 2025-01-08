import { db, migrateToLatest } from './db';
import type { AppConfig } from '$lib/types';
import { appState } from '$lib/state.svelte';
import { doesTableExist } from '$lib/utils/db';
import { configSchema } from '$lib/zod';

const getConfig = async () => {
  const config = await db.selectFrom('config').selectAll().executeTakeFirst();
  return config?.data as AppConfig;
};

class Config {
  appConfig: AppConfig | null = $state(null);

  async load() {
    console.log('Loading config');
    appState.status = 'loading.config';
    appState.message = 'Loading config';

    if (!(await doesTableExist('config')) || !(await getConfig())) {
      appState.firstLaunch = true;
      appState.status = 'loading.config.initializing';
      console.log('Initializing config');

      await migrateToLatest();
      this.appConfig = await getConfig();

      return false;
    }

    const config = configSchema.safeParse(await getConfig());

    if (config.success) {
      this.appConfig = config.data;
    }

    if (!this.appConfig?.token) {
      appState.status = 'error.token.null';
      return false;
    }

    return true;
  }
}

export const config = new Config();
