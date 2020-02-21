import { PasswordInput } from "./../Shared/PasswordInput";
import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;
}
