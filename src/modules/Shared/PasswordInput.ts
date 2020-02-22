// import { Min } from "class-validator";
import { InputType, Field } from "type-graphql";
import "reflect-metadata";

@InputType()
export class PasswordInput {
  @Field()
  // @Min(5)
  password: string;
}
