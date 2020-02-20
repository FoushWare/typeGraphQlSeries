import { User } from "./../../entity/User/User";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import "reflect-metadata";
import * as bcrypt from "bcryptjs";
import { RegisterInput } from "./RegisterInputs";

@Resolver()
export class RegisterResolver {
  @Query(() => String, { name: "helloWorld" })
  hello() {
    return "hello world";
  }
  @Mutation(() => User)
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput
  ): Promise<User> {
    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
