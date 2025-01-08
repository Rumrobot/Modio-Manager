import { db } from '../db';
import { sql } from 'kysely';

export const doesTableExist = async (name: string) => {
  const result = await sql`select name
                           from sqlite_master
                           where type = 'table'
                             and name = ${name}`.execute(db);

  return result !== undefined;
};
