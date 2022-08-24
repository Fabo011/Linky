import { Pool } from 'pg';
import 'dotenv/config';

export const pool = new Pool({
  max: 20,
  connectionString: process.env.Database,
  idleTimeoutMillis: 30000,
});

export function dbConnect() {
  pool.connect((err: any) => {
    if (err) throw new Error(err);
    console.log('Successfully connected to database');
  });
}
