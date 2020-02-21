import { MyContext } from "./../../types/MyContext";
import { User } from "./../../entity/User/User";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import "reflect-metadata";
import * as bcrypt from "bcryptjs";

@Resolver()
export class loginResolver {
  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return null;
    }
    if (!user.confirmed) {
      return null;
    }
    ctx.req.session!.userId = user.id;

    return user;
  }
}
