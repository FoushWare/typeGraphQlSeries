//This is the start point of the project
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import "reflect-metadata";

//make a main function to execute
const main = async () => {
  @Resolver()
  class HelloResolver {
    @Query(() => String, { name: "helloWorld" })
    hello() {
      return "hello world";
    }
  }
  //Our Logic
  //bootstraping the shcema to add it to http server like apollo-express
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  });

  const apolloServer = new ApolloServer({ schema });
  const app = Express();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () =>
    console.log(`server runs on port http:localhost:4000/graphql`)
  );
};
main();
