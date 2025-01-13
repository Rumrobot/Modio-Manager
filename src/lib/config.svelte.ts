import { db, migrateToLatest } from './db';
import { type AppConfig, Status } from '$lib/types';
import { appState } from '$lib/state.svelte';
import { doesTableExist } from '$lib/utils/db';
import { configSchema } from '$lib/zod';

const getConfig = async () => {
  const config = await db.selectFrom('config').selectAll().executeTakeFirst();
  return config?.data as AppConfig;
};

class Config {
  appConfig: AppConfig | null = $state(null);

  async set(data: Partial<AppConfig>) {
    const test = configSchema.safeParse({ ...this.appConfig, ...data });

    if (test.success) {
      this.appConfig = test.data;
      const result = await db
        .updateTable('config')
        .set('data', test.data)
        .execute();

      return !!result;
    } else {
      return false;
    }
  }

  async load() {
    appState.status = Status.LOADING;
    appState.message = 'Loading config';

    if (!(await doesTableExist('config')) || !(await getConfig())) {
      appState.firstLaunch = true;
      await migrateToLatest();
      this.appConfig = await getConfig();

      return false;
    }

    const config = configSchema.safeParse(await getConfig());

    if (config.success) {
      this.appConfig = config.data;
    }

    if (!this.appConfig?.token) {
      appState.status = Status.INVALID_TOKEN;
      appState.message = 'Missing Mod.io token';
      return false;
    }

    return true;
  }
}

export const config = new Config();
