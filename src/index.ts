import { MeResolver } from "./modules/user/Me";
import { redis } from "./redis";
import { RegisterResolver } from "./modules/user/Register";
//This is the start point of the project
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import "reflect-metadata";
import { createConnection } from "typeorm";
import connectRedis from "connect-redis";
import cors from "cors";
import RedisStore from "connect-redis";
import { loginResolver } from "./modules/user/login";

import session from "express-session";

//make a main function to execute
const main = async () => {
  await createConnection(); // read from the ormconfig and make the connection

  //Our Logic
  //bootstraping the shcema to add it to http server like apollo-express
  const schema = await buildSchema({
    resolvers: [RegisterResolver, loginResolver, MeResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req }: any) => ({ req })
  });
  const app = Express();
  const RedisStore = connectRedis(session);
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000"
    })
  );
  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () =>
    console.log(`server runs on port http:localhost:4000/graphql`)
  );
};
main();
