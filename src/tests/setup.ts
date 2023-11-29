import { afterAll, beforeEach } from "bun:test";
import { unlinkSync } from "node:fs";
import db from "../../db/db";

beforeEach(() => {
  db.query('DELETE FROM user').run();
});

afterAll(() => {
  unlinkSync(Bun.env.DB_FILE_PATH as string);
});