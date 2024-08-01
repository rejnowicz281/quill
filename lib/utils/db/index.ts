import { Pool, QueryResultRow } from "pg";

export const pool = new Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT!),
    host: process.env.DB_HOST
});

const query = <Result extends QueryResultRow>(text: string, params: any[] = []) => {
    return pool.query<Result>(text, params);
};

export default query;
