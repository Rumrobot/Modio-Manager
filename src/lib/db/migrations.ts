import { Kysely, type Migration, type MigrationProvider } from 'kysely';

const migrations: Record<string, Migration> = {
  '0_Init': {
    up: async function (db: Kysely<any>): Promise<void> {
      await db.schema
        .createTable('config')
        .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
        .addColumn('data', 'json')
        .execute();

      await db
        .insertInto('config')
        .values({
          data: {
            token: null,
          },
        })
        .returningAll()
        .executeTakeFirstOrThrow();
    },

    down: async function (db: Kysely<any>): Promise<void> {
      db.schema.dropTable('config');
    },
  },
};

export const Migrations: MigrationProvider = {
  async getMigrations(): Promise<Record<string, Migration>> {
    return migrations;
  },
};
