import { db, migrateToLatest } from '../db';

const getConfig = async () =>
  await db.selectFrom('config').select('config.data').executeTakeFirst();

class Config {
  public async load() {
    console.log('Loading...');

    let config = await getConfig();
    if (!config) {
      await migrateToLatest();

      config = await getConfig();
    }

    console.log('Loaded config', config);

    console.log('Database loaded');
  }
}

export const config = new Config();