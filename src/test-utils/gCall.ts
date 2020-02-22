import { createSchema } from "./../utils/createSchema";
import { graphql, GraphQLSchema } from "graphql";
import Maybe from "graphql/tsutils/Maybe";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}
let schema: GraphQLSchema;
export const gCall = async ({ source, variableValues }: Options) => {
  // cache the schema so not to recreate it every test
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema: schema,
    source,
    variableValues
  });
};
