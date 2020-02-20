import { RegisterResolver } from "./modules/user/Register";
//This is the start point of the project
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { createConnection } from "typeorm";

//make a main function to execute
const main = async () => {
  await createConnection(); // read from the ormconfig and make the connection

  //Our Logic
  //bootstraping the shcema to add it to http server like apollo-express
  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });

  const apolloServer = new ApolloServer({ schema });
  const app = Express();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () =>
    console.log(`server runs on port http:localhost:4000/graphql`)
  );
};
main();
