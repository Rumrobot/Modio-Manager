import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface DB {
  config: ConfigTable;
}

interface ConfigTable {
  id: Generated<number>;
  data: unknown;
}

export type Config = Selectable<ConfigTable>;
export type NewConfig = Insertable<ConfigTable>;
export type ConfigUpdate = Updateable<ConfigTable>;
