import { createConnection } from "typeorm";

//create a test connection to the DB
export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "ts_graphql_test",
    synchronize: true,
    logging: false,
    dropSchema: drop,
    entities: ["src/entity/**/*.ts"]
    // migrations: ["src/migration/**/*.ts"]
    // subscribers: ["src/subscriber/**/*.ts"]
  });
};
