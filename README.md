<a href="https://www.youtube.com/playlist?list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs" target="_blank"><img src="https://i.ytimg.com/vi/8yZImm2A1KE/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLChbDje4oU1aSIeQEiyOGfDPF5XAA" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


typeGraphQl series

- Setup TypeGraphQl
- register
- validation
- login
- auth / middleware
- confirmation email
- forget /change password
- logout
- write a test
- Higher order Resolvers

# Setup TypeGraphQl

install

    yarn add apollo-server-express express graphql reflect-metadata type-graphql

    yarn add -D @types/express  @types/graphql @types/node nodemon ts-node typescript

then add tsconfig.json file

    {
      "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "lib": ["dom", "es6", "es2017", "esnext.asynciterable"],
        "sourceMap": true,
        "outDir": "./dist",
        "moduleResolution": "node",
        "declaration": false,
        "composite": false,
        "removeComments": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "noImplicitThis": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "allowSyntheticDefaultImports": false,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "skipLibCheck": true,
        "baseUrl": ".",
        "rootDir": "src"
      },
      "exclude": ["node_modules"],
      "include": ["./src/**/*.tsx", "./src/**/*.ts"]
    }

write the entry point of the app [ index.ts ]

---

- Write the main function
- write the logic in it

  const main = async () => {}
  main();

  //This is the start point of the project
  import { ApolloServer } from "apollo-server-express";
  import \* as Express from "express";
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
