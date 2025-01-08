import { appDataDir } from '@tauri-apps/api/path';
import Database from '@tauri-apps/plugin-sql';
import { Kysely, Migrator } from 'kysely';
import { TauriSqliteDialect } from 'kysely-dialect-tauri';
import type { DB } from './types';
import { Migrations } from '$lib/db/migrations';

export const db = new Kysely<DB>({
  dialect: new TauriSqliteDialect({
    database: async (prefix) =>
      Database.load(`${prefix}${await appDataDir()}config.db`),
  }),
});

export const migrateToLatest = async () => {
  const migrator = new Migrator({
    db,
    provider: Migrations,
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
  }
};
